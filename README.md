## Getting Started

[RESAS API KEY](https://opendata.resas-portal.go.jp/)を取得して以下のファイルを作成し、`RESAS_API_KEY`を設定して下さい。

- .env.local

```
RESAS_API_KEY=YOUR_RESAS_API_KEY
```

- .env.test.local

```
RESAS_API_KEY=YOUR_RESAS_API_KEY
```

以下で起動できます。

```bash
npm run dev
# or
yarn dev
```

## Deploy on Vercel

Vercel にデプロイする場合は環境変数に RESAS_API_KEY を追加し、取得した API KEY を入力して下さい。
