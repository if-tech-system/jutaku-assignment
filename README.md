# 課題概要

https://if-tech.notion.site/177285b35dff806faa95f2d08e32f195

# 環境

※プロジェクトによって、リードエンジニアが書き換えてください。

- Production 環境: https://template-nextjs-swart.vercel.app/
- Development 環境:https://template-nextjs-git-main-if-app.vercel.app/
- Local 環境: http://localhost:3000

## インフラ

- Nextjs → Vercel
- DB → Supabase Postgres(Prisma)
- Auth → Supabase Auth
- Storage → Supabase Storage
- CI/CD → GitHub Actions

## ルール

| 項目              | ルール                                 | 例                                                                                                                                             |
| :---------------- | :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| ブランチ名        | <Notion_Task_ID>-<ブランチの内容>      | - #1-implement-score-management<br>- #TSK-207-create-avatar-screen<br>- #TSK-208-develop-questionnaire-function                                |
| commit メッセージ | <種類>: <変更内容> (#<Notion_Task_ID>) | - feat: スコア管理機能を実装 (#TSK-207)<br>- fix: アバター画面のレイアウトを修正 (#TSK-208)<br>- docs: アンケート機能の仕様書を更新 (#TSK-209) |

### ブランチ名の命名ルール:

- 先頭に関連する NotionID を付ける
- Notion Task ID の後にハイフン（-）を入れる
- ブランチの内容を簡潔に表す英語の単語やフレーズを使用する
- 単語間はハイフン（-）で区切る

## Commit メッセージのルール

コミットメッセージは、プロジェクトの変更履歴を理解しやすくするために重要です。以下のルールにしたがってメッセージを記述してください。

### コミットタイプ一覧

| タイプ     | 説明                                           | 例                                            |
| ---------- | ---------------------------------------------- | --------------------------------------------- |
| `feat`     | 新機能の追加                                   | `feat: ユーザー認証機能を追加`                |
| `fix`      | バグの修正                                     | `fix: ログイン時のエラーを修正`               |
| `docs`     | ドキュメントの変更                             | `docs: READMEを更新`                          |
| `style`    | コードのフォーマット変更（機能に影響なし）     | `style: コードのインデントを修正`             |
| `refactor` | コードのリファクタリング（機能改善なし）       | `refactor: 関数名をよりわかりやすく変更`      |
| `perf`     | パフォーマンスの改善                           | `perf: データ取得処理を最適化`                |
| `test`     | テストの追加や修正                             | `test: ユーザー認証機能の単体テストを追加`    |
| `chore`    | ビルドプロセスやツールの変更、その他雑多な作業 | `chore: 依存パッケージを最新バージョンに更新` |

### コミットメッセージの書き方

1. **種類（タイプ）**: 上記のタイプから適切なものを選び、先頭に記述します。
2. **変更内容（サマリー）**: 簡潔に変更点を説明します。
3. **タスク ID（オプション）**: 関連するタスクや Issue があれば、括弧内に記載します。

**フォーマット:**

<タイプ>: <変更内容> (#<タスク ID>)

**例:**

- `feat: 新しいダッシュボードを追加 (#TSK-101)`
- `fix: プロファイル画像のアップロードバグを修正 (#BUG-202)`

### ベストプラクティス

- **簡潔に**: 50 文字以内で変更点をまとめる。
- **命令形を使用**: メッセージは命令形で書く（例: `Add`, `Fix`）。
- **具体的に**: 何を、なぜ変更したのかを明確に記述する。
- **関連タスクのリンク**: 作業が特定のタスクや Issue に関連する場合は、リンクを追加する。

このルールに従うことで、プロジェクトの履歴が整理され、他の開発者とのコミュニケーションがスムーズになります。

## Getting Started

### 準備

1. リポジトリクローン → VS Code で開く

```bash
# リポジトリクローン
git clone ~~~
cd ~~~

# リモートリポジトリ追加して、最新ブランチを取得
git remote add upstream https://github.com/if-tech-system/template-nextjs-native.git
git pull upstream main

# VS codeで開く
code .

# Nativeアプリが不要なら削除
rm -r ./native
```

2. Bun のインストール

```bash
# protoをインストール
curl -fsSL https://moonrepo.dev/install/proto.sh | bash
# .prototoolsファイルにpinされているバージョンのbunをインストール
proto install bun --pin
```

3. Vercel CLI のインストール

```bash
npm install -g vercel
```

参考：https://vercel.com/docs/cli

### 初期設定

初期設定のためのコマンドを実行する。
main ブランチを pull した場合もこれを実行するとリセットできる。

```bash
# 一気にセットアップする。
bun run setup

# 👆は以下のコマンドの集約
# 既存のnode_modulesがあれば消す
rimraf node_modules;
# Bunを最新にインストールする
bun upgrade
# .envファイルを作成
cp .env.example .env
# データベース作成&マイグレーション
bun run db:up && bun run db:migrate
# データベースに初期データを入れる
bun run db:seed

```

※コマンドは、package.json の scripts にて定義

### ローカル環境で開発する。

```
bun dev
```

ローカル環境：[http://localhost:3000](http://localhost:3000)

---

# リードエンジニア向け資料

## CORS 設定

- Vercel へデプロイする際は、CORS_PROD_URL、CORS_PREV_URL を Vercel の環境変数を設定する

```bash
# VERCEL_ENV=productionの際に使用する「https://ドメイン」を設定
CORS_PROD_URL=https://production-domain.com

# VERCEL_ENV=previewの際に使用する「https://ドメイン」を設定
CORS_PREV_URL=https://preview-domain.com

# VERCEL_ENV=developmentの際に使用する「https://ドメイン」を設定
CORS_DEV_URL=https://development-domain.com

# ローカル環境の「http://ドメイン:ポート番号」を設定
CORS_LOCAL_URL=http://localhost:3000
```

## ログインチェックの URL 指定とチェック失敗時の戻し URL 設定

- src/const/config.ts の以下の項目を必ず設定する

```typescript
// ログイン済みチェックURLリスト
export function isLoginedCheckUrl(url: string): boolean {
  return (
    url.startsWith("/my-page") ||
    url.startsWith("/users") ||
    url.startsWith("/posts")
  );
}
// ログイン済みチェックで失敗した際のリダイレクト先
export const LOGINED_CHECK_FAILED_REDIRECT_URL: string = "/";
```

## Vercel へのデプロイ

```bash
# 開発環境へのデプロイ
bun dev-deploy

# 本番環境へのデプロイ
bun prod-deploy
```

## Supabase

1. dev 環境と prod 環境で Supabase プロジェクトを分けて作成する
2. Authentication でメール認証や Google 認証を有効にする
3. URL と KEY を、dev は`.env`ファイルにコピペ、prod は Vercel の環境変数に設定する

## Vercel

### プロジェクト作成

1. Vercel にログイン
2. if-tech-customer にてプロジェクト作成
3. リポジトリを選択
4. 設定
5. `Vercel` > `Settings` > `Environment Variables`にて.env をコピー
6. `Vercel` > `Settings` > `Git`にて GitHub 連携
7. `Vercel` > `Settings` > `Functions` > `Function Region`にて Tokyo,Japan(Northeast)-hnd1 に設定
8. ローカルで試しにデプロイ

```bash
bun run dev-deploy
```

### Postgres データベース作成

1. 該当プロジェクトの Storage へ移動
1. Vercel のプロジェクトページに移動 https://vercel.com/if-tech-customer
1. 該当プロジェクト > Storage を選択
1. Create Database からデータベース作成
1. シンガポールを選択(現状日本リージョンはない)
   作成が完了するとプロジェクトの Environment Variables に env ファイルの内容が自動で設定される。

## CI/CD

GitHub Actions を利用して CI/CD を行う。

### CI: コミット時に品質チェック

- Type: `bun run typecheck`
- Lint: `bun run biome:check`
- Format: `bun run biome:check`
- Build: `bun run build`
- 単体テスト: `bun run test`

### CD: Vercel へのデプロイ

- main ブランチプッシュは dev へデプロイ
- release ブランチプッシュで prod へデプロイ

### 初期設定

1. [ ] 手動デプロイ設定

```bash
bun run dev-deploy
```

`.vercel`ディレクトリが作成される。

2. [ ] 自動デプロイ設定
       Project > Settings > Git
1. GitHub 連携を行う
1. リポジトリを選択
1. Production Branch: `release`に設定する。(事前に作らないとエラーになる)

https://vercel.com/if-app/template-nextjs/settings/git

もしくは、GitHub Actions から自動デプロイ設定を行う。
GitHub > リポジトリ > Settings > Actions secrets and variables にて Vercel トークンの設定する。

- ORG_ID:`team_X0xeBgqRASts3wkAxQQAhTJe`（`.vercel/project.json`参照）
- PROJECT*ID: prj*~~~~~~~~~（`.vercel/project.json`参照）
- VERCEL_TOKEN: https://vercel.com/account/tokensでリポジトリ名-github作成

---

# アーキテクチャ

## 大枠

- web フロント: `/src`
- api: `/server`
- db: `/prisma`

## フォルダー構成

- `.github`：GitHub Actions の設定
- `.vercel`：Vercel の設定
- `.vscode`：VS Code の設定
- `/public`：静的ファイル
- `/@types`:d.ts ファイル、nextjs-routes.d.ts は、ページが増えたり、API を追加した際などに自動で変更が反映されるため、自分の修正で変更が発生する場合は、必ず commit に含めること
- `/prisma`：Prisma のスキーマファイル
  - `schema.prisma`：データベースのテーブルのモデルを定義したスキーマファイル。
    `bun run db:migrate`でデータベースのマイグレーション
    `bun run db:generate`で Prisma の型ファイルを生成
  - `seed.ts`：データベースの初期データを投入するためのコードをまとめたファイル。
    `bun run db:seed`で実行
- `/lib`：ライブラリ：初期化・設定して export して利用できるようにする。
  - `/supabase`: Supabase のフロント、サーバークライアント設定
  - `/trpc`: tRPC の Web、Native、サーバークライアント設定
- `/util`：便利な変数、関数
  - `env.ts`：環境変数
  - `index.ts`：便利な関数
- `/src`：Web アプリのソースコード
  - `/app`: Nextjs App Router のディレクトリ
    - `/api`：API 関連:trpc を使うので、基本使わない。
      - `trpc/[trpc].ts`：trpc のエンドポイント
    - `page.tsx`：ページ（サーバーコンポーネントのみ）
    - `layout.tsx`：レイアウト
    - `*/_components`：ページのみ使うコンポーネント（クライアントコンポーネントあり）
      - trpc のコードを使うことでがシンプルになるため、集約したほうが見やすい。
      - そのため、無理に hooks に分けなくて良い。
    - `*/hooks`：ページのみ使うカスタムフック（ロジックがでかい場合分離する）
  - `/components`：複数ページで使うコンポーネント
  - `/const`：定数。アッパースネークケースで定義
    - `config.ts`：設定
    - `key.ts`：cookie や localStorage のキー
  - `/hooks`：複数ページで使うカスタムフック
  - `/test`：テストコードを集約
- `/types`：フロント、バックエンドの型定義
- `/schemas`：フロント、バックエンドのバリデーションスキーマの定義
- `/server`：API サーバー
  - `/router`：trpc のルーティング設定
    - `/[ドメインオブジェクト名].ts`：2 階層目でルーティング設定
      - 2 階層以上細かく分けられるので、
      - あまりファットコントローラー気にせずに、ここにロジックを入れて良い。
      - ロジックが複雑な場合は、service 層に分ける
  - `/repository`：データベース操作オブジェクト
    - `[table名].ts`：テーブルごとにリポジトリを作成
  - `/middleware`：tRPC のミドルウェア
    - `auth.ts`：認証・認可ミドルウェア

# 技術選定

## ライブラリ

- [VS Code](https://code.visualstudio.com/): エディタ
- [Bun](): ランタイム・プロジェクト管理・テストツール
- [TypeScript](https://www.typescriptlang.org/): 型付け
- [React](https://ja.reactjs.org/): フロントエンドライブラリ
- [Next.js](https://nextjs.org/): React フレームワーク
- [trpc](https://trpc.io/): API クライアント・サーバー
- [Prisma](https://www.prisma.io/): ORM
- [PostgreSQL](https://www.postgresql.org/): データベース
- [Vercel](https://vercel.com/): ホスティング
- [GitHub Actions](https://docs.github.com/ja/actions): CI/CD
- [Docker](https://www.docker.com/): コンテナ
- [Biome](https://biomejs.dev/ja/): フォーマット・Lint
- [Zod](https://zenn.dev/fumito0808/articles/29ad3c1b51f8fe): バリデーション
- [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks): git フック。Commit Push 時に Lint・Format・テスト実行
- [nextjs-routes](https://github.com/tatethurston/nextjs-routes): Next.js のルーティング型安全
- [trpc＆React Query](https://trpc.io/docs/client/react):API クライアント
- [Supabase Auth](https://supabase.com/docs/guides/auth): 認証
- [react-hook-form](https://react-hook-form.com/get-started#Quickstart): フォーム
- [mantine](https://ui.mantine.dev/): UI ライブラリ
  - [UI 集](https://ui.mantine.dev/)
- [dayjs](https://zenn.dev/akkie1030/articles/javascript-dayjs): 日時操作
- dotenv: 環境変数

## 型定義とスキーマ定義のルール

プロジェクト内での型定義とスキーマ定義に関する統一ルールを以下に示します。これにより、フロントエンドとバックエンド間での一貫性を保ち、メンテナンス性を向上させます。

### 型定義のルール

- **ディレクトリ構成**

  - 型定義は`/types`ディレクトリ内に配置します。
  - ドメインごとにサブディレクトリを作成し、関連する型を整理します。
  - index.ts に集約し、~types で呼び出せるように設定してください。

- **命名規則**

  - 型名は`PascalCase`を使用します。
  - 意味のある具体的な名前を付け、`User`, `Product`, `Order`などとします。

- **API から取得するデータの型**

  - API から取得するデータの型については、基本的に Repository のメソッドの戻り値の型を設定して、フロントエンドでも利用してください。
    【サンプル】

  ```ts
  export type FindEngagedSubcontractorsReturnType = Awaited<
    ReturnType<typeof userRepository.findEngagedSubcontractors>
  >;
  export const userRepository = {
    async findEngagedSubcontractors(projectId: string) {
      try {
        return await prisma.user.findFirst({
          where: {
            role: "SUBCONTRACTOR",
            subcontractorEntries: {
              some: {
                projectId: projectId,
                status: "ACCEPTED",
              },
            },
          },
        });
      } catch (error) {
        console.error(
          `プロジェクトID ${projectId} の担当下請け業者取得中にエラーが発生しました:`,
          error
        );
        throw new Error("担当下請け業者の取得に失敗しました");
      }
    },
  };
  ```

### スキーマ定義のルール

**使用ライブラリ**

- バリデーションスキーマは`Zod`を使用します。

- **ディレクトリ構成**

  - スキーマ定義は`/schemas`に配置し、フロントエンドとバックエンドで共有します。

- **命名規則**
  - スキーマ名は`<Entity>Schema`とし、たとえば`UserSchema`, `ProductSchema`とします。
- **型の推論**

  - `Zod`の`infer`を使用して TypeScript 型を生成し、型とスキーマの整合性を保ちます。

- **共有**
  - フロントエンドではフォームバリデーションに、バックエンドでは API リクエストのバリデーションに同一スキーマを使用します。
- **拡張性**
  - 必要に応じて、スキーマにカスタムバリデーションやトランスフォーメーションを追加します。

### ベストプラクティス

- **一貫性の維持**
  - 型定義とスキーマ定義は常に最新の状態に保ち、変更があった際はフロントエンドとバックエンド双方に反映させます。
- **コミット前の確認**
  - 型やスキーマを変更する際は、関連する部分が正しく動作するか必ずテストを実施してください。
- **ドキュメントの更新**
  - 新しい型やスキーマを追加した際は、README や関連ドキュメントも更新し、チーム全体で共有します。

## VS Code 拡張機能

- Code Spell Checker: スペルチェック
- Biome: フォーマット・Lint
- Todo Tree: TODO コメントを表示 `// TODO: explain` で表示
- GitLens: Git の情報表示
- DotENV: .env ファイルのシンタックスハイライト
- prisma: prisma.schema のシンタックスハイライト
- Auto Rename Tag: 閉じタグを変更すると開始タグも変更される
- Docker: Dockerfile のシンタックスハイライトと補完。Docker パネル追加。
- GitHub Copilot: AI コード補完
- GitHub Actions: GitHub Actions のシンタックスハイライト
- Change Case: キャメルケース、スネークケース、パスカルケースなどの変換
  `Cmd + Shift + P`でコマンドパレットから`Change Case`と打って変換
- color-highlight: カラーコードをプレビュー

## Project Rules (.cursor/rules) の活用とカスタマイズについて

- **自由なカスタマイズの許容**  
  使用していく中で、開発チームや個々のプロジェクトの状況に合わせて、独自にルールをカスタマイズして構いません。ただし、カスタマイズ内容はできるだけチーム全体で共有し、一貫性のある運用を心がけましょう。

- **改善提案の共有**  
  使っていくうちに「もっとこうしたほうがいい」といった提案や改善点が出てきた場合は、積極的に共有してください。提案はルールのアップデートに反映し、プロジェクト全体の品質向上を目指します。

- **参考サイト**  
  Project Rules に関する参考情報として、以下のサイトもご参照ください。
  - [Zenn: 記事](https://zenn.dev/globis/articles/cursor-project-rules)
  - [Qiita: 記事](https://qiita.com/tichise/items/6c4d8fc91b57d5f47359)

## tRPC

1. API 設定：`/server/router.ts`にルーターとリクエスト/レスポンスの型を設定する。
2. クライアント設定：`/lib/trpc`にてクライアント設定

- tRPC のメソッド集：http://localhost:3000/api/trpc/panel

### 用途

- クライアントコンポーネントから叩く場合には`clientApi`を使う。
- Native アプリから叩く場合には`nativeApi`を使う。
- サーバーコンポーネントから叩く場合には`serverApi`を使う。
  - ※認証が必要なメソッドは getIsLoggedIn を使って認証を確認しないとページごとレンダリングエラーになる

# Auth

サーバーサイドで認証するため、Supabase 認証サービスで認証し、SessionCookie を使ってサーバー側で認証する。

## 認証フロー

1. Supabase 認証サービスにて認証してサーバーへ送信 `/src/hooks/supabaseAuth.ts signin()`
2. サーバーミドルウェアにて検証後、SessionCookie を発行 `/src/middleware.ts`
3. クライアントを使って API を叩くときはセッション Cookie を使ってサーバー認証 `/server/middleware/supabaseAuth.ts`
4. Supabase ログアウト時にページリロードしてセッション Cookie を更新（削除） `/src/hooks/supabaseAuth.ts signout()`→`/src/middleware.ts`

## ユーザー新規登録（NativeApp）

1. Supabase 認証サービスにて新規登録
2. Supabase 認証サービスの sessionCookie でサーバーサイド認証
3. Supabase 認証サービスの accessToken をデコードして、sub を取得し、userId としてユーザー情報を登録

## ユーザー新規登録（WebApp）

1. Supabase 認証サービスにて新規登録
2. Supabase 認証サービスの sessionCookie でサーバーサイド認証
3. リダイレクト(/new-user)でセッションからユーザー情報を取得し、DB にユーザーを登録
   ※このタイミング DB の USER の ID に supabase の userID を登録する

## 管理者の新規登録

1. Supabase 認証サービスにて手動で新規登録（auto confirm を使用）
2. DB に接続し、User テーブルに登録した email アドレスと id と任意の名前と権限を登録する（そのほかアプリにおいて管理者に必要な情報があれば、追加する）
3. id については、supabase の user 情報で確認(id)を活用する
   ※middleware で取得する userId が supabase の userId のため、DB にも supabase の userId を設定しておく
   ※ローカル環境については、seed データで投入されるように設定されているため修正する

### テストアカウントのログイン情報　※テンプレの情報のため、アプリごとに設定必要

| 権限               | id                                     | email             | password     |
| ------------------ | -------------------------------------- | ----------------- | ------------ |
| 管理者　　         | "9bf5aed7-ad62-4ce4-96fd-208b639fcd0f" | admin@test.com    | admintest    |
| コンテンツ管理者　 | "73787a60-d2f0-407b-8f10-f5e5e4887ff0" | contents@test.com | contentstest |

## 認可フロー

1. クライアントがサーバーにリクエストを送信（SessionCookie を含む）
2. サーバーは SessionCookie を使って認証
3. SessionCookie からユーザー情報を取得して認可

### 認可ミドルウェア

| tRPC の Procedure | 認証 | 説明               |
| ----------------- | ---- | ------------------ |
| publicProcedure   | No   | 認証不要           |
| userProcedure     | Yes  | 自分自身の認可     |
| adminProcedure    | Yes  | 管理ユーザーの認可 |

### DATETIME の処理について

prisma を使用しているため、DB への日時の保存が UTC となるため、基本的に UTC での登録を行う。
また、正確の日時の反映のため、JST への変換処理は、フロントエンドで行う

## レスポンシブデザインの設定 ※プロジェクトごとに定義する

### Mantine UI ブレークポイントの使用

このプロジェクトではレスポンシブデザインを実現するために、Mantine UI が提供するデフォルトのブレークポイントを採用する。

SP に適したスタイルは、xs ブレークポイント（576px）を基準に設定する。

## コミュニケーションルール

仕様に関する質問については、該当する Issue のコメント、または、Notion のタスクに記載し、Slack にも連絡するようにする。
slack のメンションについては、質問をしたい人につける。

デザインについて、質問がある場合、Figma にコメントを残した上で、Slack にて、質問を記載する
slack のメンションについては、質問をしたい人につける。
