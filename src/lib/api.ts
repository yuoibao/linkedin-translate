import { StyleOption, Mode } from './constants';

const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

const PROMPTS = {
  to_linkedin: {
    general: `你是一个专业的LinkedIn内容撰写专家。请把用户输入的大白话翻译成专业、地道、LinkedIn风格的英文表述。

要求：
1. 保持真实，不要过度夸张
2. 使用LinkedIn常见表达（如：spearheaded, drove, enabled, delivered, leveraged等）
3. 适当量化成果（如果用户提到具体数字要保留）
4. 每句话突出一个重点，不要废话
5. 总字数控制在输入的1.5-2倍
6. 只输出翻译结果，不要解释`,

    startup: `你是一个活跃在创业圈的创始人，擅长用充满激情和颠覆性的语言撰写LinkedIn内容。

要求：
1. 多用"颠覆"、"创新"、"突破"、"赛道"、"破局"等词汇
2. 强调growth（增长）、impact（影响力）、scale（规模化）
3. 语气自信、有魄力
4. 保持真实，不要虚假夸大
5. 只输出翻译结果，不要解释`,

    consulting: `你是一个顶级咨询公司的顾问，擅长用咨询黑话撰写LinkedIn内容。

要求：
1. 多用"赋能"、"抓手"、"闭环"、"生态"、"协同"、"价值最大化"等词汇
2. 强调方法论、专业性、系统性
3. 善用"通过xxx实现yyy"的句式
4. 保持专业但不空洞
5. 只输出翻译结果，不要解释`,
  },

  to_human: `你是一个犀利的职场观察者，擅长把LinkedIn上的空洞废话翻译成直白的大白话。

要求：
1. 一针见血指出对方实际想表达的核心意思
2. 可以带轻微吐槽，但要幽默有度，不伤人
3. 用简洁直白的语言，不要废话
4. 格式：先用大白话翻译，然后换行写吐槽
5. 只输出翻译结果，不要额外说明

示例：
输入："Passionate about driving innovative solutions in a fast-paced environment"
输出：
大白话：工作挺忙的，有时候得催人干活
吐槽：所以你到底推动了啥创新？具体点会死吗`,
};

interface TranslateParams {
  text: string;
  mode: Mode;
  style?: StyleOption;
  apiKey?: string;
}

interface TranslateResult {
  success: boolean;
  result?: string;
  error?: {
    code: string;
    message: string;
  };
}

export async function translate({
  text,
  mode,
  style = 'general',
  apiKey,
}: TranslateParams): Promise<TranslateResult> {
  if (!text.trim()) {
    return {
      success: false,
      error: { code: 'TEXT_EMPTY', message: '请输入要翻译的内容' },
    };
  }

  if (text.length < 10) {
    return {
      success: false,
      error: { code: 'TEXT_TOO_SHORT', message: '内容太短，请补充更多细节' },
    };
  }

  if (text.length > 500) {
    return {
      success: false,
      error: { code: 'TEXT_TOO_LONG', message: '内容过长，请控制在500字以内' },
    };
  }

  if (!apiKey) {
    return {
      success: false,
      error: { code: 'API_ERROR', message: '未配置API密钥' },
    };
  }

  const prompt =
    mode === 'to_linkedin'
      ? PROMPTS.to_linkedin[style].replace('{user_input}', text)
      : PROMPTS.to_human.replace('{user_input}', text);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Kimi API error:', response.status, errorData);
      return {
        success: false,
        error: { code: 'API_ERROR', message: '服务繁忙，请稍后重试' },
      };
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return {
        success: false,
        error: { code: 'API_ERROR', message: '服务繁忙，请稍后重试' },
      };
    }

    return { success: true, result };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: { code: 'API_TIMEOUT', message: '翻译超时，请重试' },
      };
    }
    console.error('Translate error:', error);
    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: '网络连接失败，请检查网络' },
    };
  }
}
