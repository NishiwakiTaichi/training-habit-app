// api/weather.ts
// このファイルはサーバー側で実行される
// APIキーは使う人には見えない

// VercelのRequest/Responseの型を自己で定義
interface WeatherQuery {
  q?: string;
  lat?: string;
  lon?: string;
}

interface ServerRequest {
  query: WeatherQuery;
}

interface ServerResponse {
  status(code: number): ServerResponse;
  json(data: object): void;
}

export default async function handler(req: ServerRequest, res: ServerResponse) {
  // サーバー側で環境変数を読む（クライアントには漏れない）
  const apiKey = process.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    console.warn('VITE_WEATHER_API_KEY が未設定です。環境変数を確認してください。');
    return res.status(500).json({ error: 'APIキーが設定されていません' });
  }

  // クライアントから送られてきたパラメータを受け取る
  const { q, lat, lon } = req.query;

  // パラメータがない場合はエラー
  if (!q && !(lat && lon)) {
    return res.status(400).json({ error: 'パラメータが不足しています' });
  }

  // クエリパラメータを安全にエンコードする
  let locationParam: string;
  if (q) {
    locationParam = `q=${encodeURIComponent(q)}`;
  } else {
    locationParam = `q=${lat},${lon}`;
  }

  try {
    // サーバー側からWeatherAPI.comにリクエスト送信
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&${locationParam}&lang=ja&aqi=no`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Weather APIのリクエストに失敗しました' });
    }

    const data = await response.json();

    // データをクライアントに返す（キーは含まない）
    return res.status(200).json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    return res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
}
