# GitHub Pages へのデプロイ手順

結論から言うと、**現在のファイル構成のままでは GitHub Pages では動きません。**

## なぜそのままでは動かないのか？
現在のコードは `.tsx` (TypeScript + JSX) という拡張子で書かれています。一般的なWebブラウザは HTML, CSS, 通常の JavaScript しか理解できず、`.tsx` ファイルを直接読み込んで実行することはできません。
現在このアプリが動いているのは、プレビュー環境（サンドボックス）が裏側で自動的に `.tsx` をブラウザが読める JavaScript に変換（トランスパイル）してくれているからです。

GitHub Pages で動かすためには、**「Vite（ヴィート）」** などのビルドツールを使って、事前に `.tsx` ファイルを通常の JavaScript に変換（ビルド）する作業が必要です。

以下に、ローカルPC（ご自身のパソコン）でプロジェクトをセットアップし、GitHub Pages に公開するまでの詳細な手順を解説します。

---

## 事前準備
パソコンに **Node.js** と **Git** がインストールされている必要があります。
インストールされていない場合は、公式サイトからダウンロードしてインストールしてください。
また、GitHub のアカウントと、空のリポジトリ（例: `sakura-connect`）を作成しておいてください。

---

## ステップ 1: Vite プロジェクトの作成

ターミナル（Macなら「ターミナル」、Windowsなら「コマンドプロンプト」や「PowerShell」）を開き、以下のコマンドを順番に実行します。

```bash
# 1. Viteを使ってReact+TypeScriptのひな型を作成
npm create vite@latest sakura-connect -- --template react-ts

# 2. 作成したフォルダに移動
cd sakura-connect

# 3. 基本的なパッケージをインストール
npm install

# 4. 必要な追加パッケージ（Tailwind CSS, アイコン）をインストール
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react

# 5. Tailwind CSS の設定ファイルを生成
npx tailwindcss init -p
```

## ステップ 2: Tailwind CSS の設定

生成された `tailwind.config.js` を開き、以下のように書き換えます。

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

次に、`src/index.css` を開き、中身をすべて消して以下の3行を追加します。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* カスタムスクロールバーなどの追加CSSがあればここに書く */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #f472b6; }
```

## ステップ 3: ファイルの配置

AIが生成したファイル群を、作成した Vite プロジェクトの `src` フォルダ内に配置します。

**配置する場所:**
* `sakura-connect/src/App.tsx` (上書き)
* `sakura-connect/src/types.ts` (新規作成)
* `sakura-connect/src/constants.ts` (新規作成)
* `sakura-connect/src/components/SakuraCard.tsx` (新規作成)
* `sakura-connect/src/components/CreateModal.tsx` (新規作成)
* `sakura-connect/src/components/DetailModal.tsx` (新規作成)

※ `index.html` は Vite プロジェクトのルート（`sakura-connect/index.html`）にあるものをそのまま使います。AIが生成した `index.html` にあった `<style>` の中身は、先ほど `src/index.css` に移したので不要です。

## ステップ 4: GitHub Pages 用の設定

### 1. `vite.config.ts` の編集
プロジェクトのルートにある `vite.config.ts` を開き、`base` パスを追加します。
※ `YOUR_GITHUB_USERNAME` と `YOUR_REPOSITORY_NAME` はご自身のものに置き換えてください。

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pagesのリポジトリ名を指定します（例: /sakura-connect/）
  base: '/YOUR_REPOSITORY_NAME/', 
})
```

### 2. デプロイ用パッケージのインストール
GitHub Pages へ簡単にアップロードするためのツールをインストールします。

```bash
npm install -D gh-pages
```

### 3. `package.json` の編集
`package.json` を開き、以下の2箇所を追記します。

```json
{
  "name": "sakura-connect",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME", // ← これを追加
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build", // ← これを追加
    "deploy": "gh-pages -d dist"  // ← これを追加
  },
  // ... 以下略
}
```

## ステップ 5: GitHub へのプッシュとデプロイ

ターミナルで以下のコマンドを実行し、GitHub にコードをプッシュします。

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

最後に、以下のコマンドを実行して GitHub Pages にデプロイします。

```bash
npm run deploy
```

このコマンドを実行すると、自動的にコードがビルド（変換）され、`gh-pages` という特別なブランチに完成品（HTML/JS/CSS）がアップロードされます。

## ステップ 6: GitHub の設定画面で確認
1. GitHub のリポジトリページを開きます。
2. 上部の「Settings」タブを開きます。
3. 左側のメニューから「Pages」を選択します。
4. 「Build and deployment」の「Source」が **Deploy from a branch** になっていることを確認します。
5. 「Branch」が **gh-pages** の `/ (root)` になっていることを確認し、「Save」を押します。

数分待つと、`https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/` にアクセスできるようになり、アプリが動作します！
