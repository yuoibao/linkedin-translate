import { StyleOption, Mode } from './constants';

// Choose your AI provider: Kimi or Minimax
const USE_MINIMAX = true;

const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';
const MINIMAX_API_URL = 'https://api.minimax.chat/v1/chat/completions';

const API_URL = USE_MINIMAX ? MINIMAX_API_URL : KIMI_API_URL;
const MODEL_NAME = USE_MINIMAX ? 'MiniMax-Text-01' : 'moonshot-v1-8k';

const PROMPTS = {
  to_linkedin: {
    general: `你是一个专业的LinkedIn内容撰写专家。你的任务是把下面这段"用户输入"翻译成专业、地道的LinkedIn风格英文表述。

【重要规则】
- 只翻译用户输入的内容，不要添加任何示例或解释
- 不要生成任何额外的"用户输入"
- 严格只输出翻译结果

用户输入：{user_input}

请直接输出翻译结果：`,

    startup: `你是一个活跃在创业圈的创始人。你的任务是把用户输入的大白话翻译成充满激情的创业圈风格LinkedIn英文表述。

【重要规则】
- 只翻译用户输入的内容，不要添加任何示例或解释
- 不要生成任何额外的"用户输入"
- 多用"颠覆"、"创新"、"突破"、"赛道"、"破局"等词汇
- 语气自信、有魄力

用户输入：{user_input}

请直接输出翻译结果：`,

    consulting: `你是一个顶级咨询公司的顾问。你的任务是把用户输入的大白话翻译成咨询腔风格的LinkedIn英文表述。

【重要规则】
- 只翻译用户输入的内容，不要添加任何示例或解释
- 不要生成任何额外的"用户输入"
- 多用"赋能"、"抓手"、"闭环"、"生态"、"协同"、"价值最大化"等词汇
- 善用"通过xxx实现yyy"的句式

用户输入：{user_input}

请直接输出翻译结果：`,
  },

  to_human: `你是一个犀利的职场观察者。你的任务是把LinkedIn废话翻译成直白的大白话，并加上轻微吐槽。

【重要规则】
- 只翻译用户输入的内容，不要添加任何示例或解释
- 不要生成任何额外的"用户输入"
- 先用大白话翻译，然后换行写吐槽
- 吐槽要幽默有度，不伤人

用户输入：{user_input}

请直接输出翻译结果（格式：大白话 + 吐槽）：`,
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

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
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
