
export interface ITest {
    id: string,
    choices: [
        {
            finish_reason: string,
            index: string,
            logprobs: string,
            message: {
                content: string
                role: string,
                function_call: string,
                tool_calls: string
            }
        }
    ],
    created: string,
    model: string,
    object: string,
    system_fingerprint: string,
    usage: {
        completion_tokens: string,
        prompt_tokens: string,
        total_tokens: string
    }
}