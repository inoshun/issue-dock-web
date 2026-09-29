# IssueDock Web

IssueDock のフロントエンドです。Next.js 16、React 19、TypeScript、Tailwind CSS 4 を使用しています。

## ローカル起動

バックエンド API は `http://localhost:3000`、Web アプリは `http://localhost:3001` で起動します。Web の `dev` スクリプトには 3001 番ポートを設定済みです。

```bash
npm install
cp .env.example .env.local
npm run dev
```

登録 API の接続先は、ブラウザー向け環境変数 `NEXT_PUBLIC_API_BASE_URL` で設定します。`.env.example` はローカル API の `http://localhost:3000` を指定しています。`.env.local` は Git 管理対象外です。API 側では `http://localhost:3001` からの CORS が許可されています。本番の許可元はフロントエンドのデプロイ完了後に設定します。

## ドキュメント

- [サインアップ画面の仕様](docs/signup-specification.md)
- [サインアップ画面の実装設計](docs/signup-implementation.md)
