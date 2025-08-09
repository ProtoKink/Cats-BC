export async function translate(message: string, sl: string, tl: string) {
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURI(message)}`);
  const json_response = await response.json();
  return json_response[0][0][0];
}