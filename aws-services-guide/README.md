# AWS主要サービス ビジュアルガイド

AWSの主要サービスをカテゴリー別に視覚的に理解できるインタラクティブなWebサイトです。

## 🎨 特徴

- **カテゴリー別分類**: 8つの主要カテゴリーでAWSサービスを整理
  - コンピューティング
  - ストレージ
  - データベース
  - ネットワーク
  - セキュリティ
  - 分析
  - 開発者ツール

- **インタラクティブなUI**:
  - カテゴリーフィルター機能
  - リアルタイム検索
  - スムーズなアニメーション
  - レスポンシブデザイン

- **視覚的な表現**:
  - カテゴリー別の色分け
  - アイコン表示
  - ホバーエフェクト
  - グラデーション背景

## 🚀 使い方

### ブラウザで開く

```bash
# シンプルな方法: ブラウザでindex.htmlを直接開く
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### ローカルサーバーで起動

```bash
# Pythonを使用
python3 -m http.server 8000

# Node.jsを使用
npx http-server

# その後、ブラウザで http://localhost:8000 にアクセス
```

## ⌨️ キーボードショートカット

- `1`: すべてのサービスを表示
- `2`: コンピューティングサービス
- `3`: ストレージサービス
- `4`: データベースサービス
- `5`: ネットワークサービス
- `6`: セキュリティサービス
- `7`: 分析サービス
- `8`: 開発者ツール

## 🔧 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**: グラデーション、アニメーション、Flexbox、Grid
- **JavaScript (Vanilla)**: フィルタリング、検索、インタラクション

## 📦 ファイル構成

```
aws-services-guide/
├── index.html      # メインHTML
├── styles.css      # スタイルシート
├── script.js       # JavaScript機能
└── README.md       # このファイル
```

## 🎯 含まれるAWSサービス

### コンピューティング
- EC2 (Elastic Compute Cloud)
- Lambda
- ECS (Elastic Container Service)

### ストレージ
- S3 (Simple Storage Service)
- EBS (Elastic Block Store)
- Glacier

### データベース
- RDS (Relational Database Service)
- DynamoDB
- Aurora

### ネットワーク
- VPC (Virtual Private Cloud)
- CloudFront
- Route 53

### セキュリティ
- IAM (Identity and Access Management)
- Cognito
- KMS (Key Management Service)

### 分析
- CloudWatch
- Athena
- QuickSight

### 開発者ツール
- CodeCommit
- CodeBuild
- CodeDeploy

## 🔨 カスタマイズ

### 新しいサービスを追加

`index.html`の`services-grid`内に新しいカードを追加:

```html
<div class="service-card" data-category="カテゴリー名">
    <div class="card-header カテゴリー名">
        <div class="icon">🎯</div>
        <h3>サービス名</h3>
    </div>
    <div class="card-body">
        <h4>正式名称</h4>
        <p>説明文</p>
        <div class="tags">
            <span class="tag">タグ1</span>
            <span class="tag">タグ2</span>
        </div>
    </div>
</div>
```

### 色のカスタマイズ

`styles.css`の`:root`セクションでカラー変数を変更:

```css
:root {
    --compute-color: #FF9900;
    --storage-color: #3B48CC;
    /* ... */
}
```

## 📱 レスポンシブデザイン

- デスクトップ: 3カラムグリッド
- タブレット: 2カラムグリッド
- モバイル: 1カラムグリッド

## 💡 高度な機能

### サービス一覧のエクスポート

ブラウザのコンソールで以下を実行:

```javascript
const services = exportServicesList();
console.log(JSON.stringify(services, null, 2));
```

### カテゴリー統計の表示

ページ読み込み時に自動的にコンソールに表示されます。

## 📝 ライセンス

このプロジェクトは学習用デモサイトです。

## 🙏 謝辞

AWSのアイコンとサービス説明は、AWSの公式ドキュメントを参考にしています。
