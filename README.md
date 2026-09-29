# IssueDock Web

IssueDock のフロントエンドです。Next.js 16、React 19、TypeScript、Tailwind CSS 4 を使用しています。

## ローカル起動

バックエンド API は `http://localhost:3000`、Web アプリは `http://localhost:3001` で起動します。現状の `dev` スクリプトにはポート指定がないため、サインアップ画面の実装時に `next dev --port 3001` へ変更します。変更前に起動する場合は次のようにポートを指定できます。

```bash
npm install
npm run dev -- --port 3001
```

登録 API の接続先は、実装時にブラウザー向け環境変数 `NEXT_PUBLIC_API_BASE_URL` で設定します。ローカルではプロジェクトルートの `.env.local` に `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000` を設定します。`.env.local` は Git 管理対象外です。API 側では `http://localhost:3001` からの CORS が許可されています。本番の許可元はフロントエンドのデプロイ完了後に設定します。

## ドキュメント

- [サインアップ画面の仕様](docs/signup-specification.md)
- [サインアップ画面の実装設計](docs/signup-implementation.md)
