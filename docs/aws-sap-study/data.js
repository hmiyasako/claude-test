// AWS SAP Study Guide - Topic Details
const topicDetails = {
    'Well-Architected Framework': {
        icon: '🏗️',
        category: 'design',
        fullName: 'AWS Well-Architected Framework',
        description: 'AWSが提供するベストプラクティス集。6つの柱（運用上の優秀性、セキュリティ、信頼性、パフォーマンス効率、コスト最適化、持続可能性）に基づいてアーキテクチャを評価・改善します。',
        features: [
            '運用上の優秀性: 運用のコード化、小さな変更を頻繁に、障害を予測',
            'セキュリティ: 最小権限、トレーサビリティ、多層防御',
            '信頼性: 自動復旧、スケーリング、変更管理',
            'パフォーマンス効率: 適切なリソース選択、実験、マネージドサービス活用',
            'コスト最適化: 消費モデル採用、効率測定、無駄の排除',
            '持続可能性: 影響の理解、目標設定、最大化'
        ],
        useCases: [
            '「最もAWSのベストプラクティスに沿った設計は？」という問題',
            '複数の選択肢から最適なアーキテクチャを選ぶ問題',
            'トレードオフを考慮した設計判断の問題',
            'Well-Architected Toolを使った評価に関する問題'
        ],
        tips: 'SAP試験の全ての問題はWell-Architected Frameworkの考え方に基づいています。「AWSならどう設計するか」という視点で考えましょう。',
        related: ['疎結合アーキテクチャ', 'スケーラビリティ設計', 'SAP試験の考え方']
    },
    '疎結合アーキテクチャ': {
        icon: '🔄',
        category: 'design',
        fullName: 'Loose Coupling Architecture',
        description: 'コンポーネント間の依存関係を最小限にする設計パターン。障害の伝播を防ぎ、スケーラビリティと保守性を向上させます。',
        features: [
            'SQS: メッセージキューによる非同期処理、デカップリング',
            'SNS: Pub/Subパターンでの1対多配信',
            'EventBridge: イベント駆動アーキテクチャの中心',
            'Step Functions: ワークフローのオーケストレーション',
            'API Gateway: サービス間のインターフェース標準化'
        ],
        useCases: [
            '「コンポーネント間の依存を減らすには？」という問題',
            '「障害の影響範囲を限定するには？」という問題',
            '「スパイクトラフィックに対応するには？」という問題',
            'マイクロサービス設計に関する問題'
        ],
        tips: '同期通信（直接呼び出し）より非同期通信（キュー経由）を優先。「SQSを挟む」は多くの問題の正解になります。',
        related: ['Well-Architected Framework', 'スケーラビリティ設計', 'サーバーレスファースト']
    },
    'スケーラビリティ設計': {
        icon: '📊',
        category: 'design',
        fullName: 'Scalability Design Patterns',
        description: '需要の変化に応じてシステムを拡張できる設計。水平スケーリング（スケールアウト）を優先し、ステートレスなアーキテクチャを目指します。',
        features: [
            '水平スケーリング: インスタンス数を増減（垂直より優先）',
            'ステートレス設計: セッション情報は外部（ElastiCache、DynamoDB）に保存',
            'Auto Scaling: 需要に応じた自動スケーリング',
            'ElastiCache: データベース負荷軽減、セッション管理',
            'CloudFront: エッジでのキャッシュ、オリジン負荷軽減'
        ],
        useCases: [
            '「急激なトラフィック増加に対応するには？」という問題',
            '「データベースのボトルネックを解消するには？」という問題',
            '「グローバルユーザーへのレイテンシーを改善するには？」という問題'
        ],
        tips: '「垂直スケーリング（インスタンスサイズ増加）」が選択肢にあっても、通常は「水平スケーリング」が正解です。',
        related: ['疎結合アーキテクチャ', 'Auto Scaling', 'マルチリージョン設計']
    },
    'サーバーレスファースト': {
        icon: '🎯',
        category: 'design',
        fullName: 'Serverless First Approach',
        description: '運用負荷を最小化するため、マネージドサービスやサーバーレスを優先的に選択する設計方針。',
        features: [
            'Lambda: イベント駆動のコード実行、最大15分',
            'API Gateway: RESTful API、WebSocket API',
            'DynamoDB: フルマネージドNoSQL、オンデマンドキャパシティ',
            'Step Functions: サーバーレスワークフロー',
            'EventBridge: イベントバス、スケジューラー'
        ],
        useCases: [
            '「運用負荷を最小化するには？」という問題',
            '「インフラ管理なしで実装するには？」という問題',
            '「従量課金で開始したい」という問題'
        ],
        tips: '「EC2で構築」と「Lambda/サーバーレスで構築」の選択肢があれば、特別な要件がない限りサーバーレスが正解になることが多いです。',
        related: ['Well-Architected Framework', '疎結合アーキテクチャ', 'コスト最適化']
    },
    'AWS Organizations': {
        icon: '🏢',
        category: 'organization',
        fullName: 'AWS Organizations',
        description: '複数のAWSアカウントを一元管理するサービス。組織単位（OU）でアカウントをグループ化し、SCPでガバナンスを適用します。',
        features: [
            'OU（組織単位）: アカウントの論理的グループ化',
            'SCP（サービスコントロールポリシー）: 権限の上限設定',
            '一括請求: 全アカウントのコストを統合',
            'ボリューム割引: 使用量の合算で割引適用',
            'タグポリシー: 組織全体でのタグ標準化'
        ],
        useCases: [
            '「複数アカウントを一元管理するには？」という問題',
            '「特定のリージョンやサービスの使用を禁止するには？」という問題',
            '「組織全体のコストを把握するには？」という問題'
        ],
        tips: 'SCPはIAMポリシーの「上限」を設定します。SCPで許可しても、IAMポリシーで許可されていなければアクセスできません。',
        related: ['Control Tower', 'Service Control Policy', 'マルチアカウント戦略']
    },
    'Control Tower': {
        icon: '🗼',
        category: 'organization',
        fullName: 'AWS Control Tower',
        description: 'マルチアカウント環境のセットアップと継続的なガバナンスを自動化するサービス。ランディングゾーンを構築し、ガードレールで統制します。',
        features: [
            'ランディングゾーン: ベストプラクティスに基づいたマルチアカウント環境',
            'ガードレール: 予防的（SCP）と検出的（Config Rules）の2種類',
            'Account Factory: 新規アカウントの標準化されたプロビジョニング',
            'ダッシュボード: コンプライアンス状況の可視化',
            'Log Archive・Audit アカウント: 集中ログ管理と監査'
        ],
        useCases: [
            '「新規にマルチアカウント環境を構築するには？」という問題',
            '「ガバナンスを自動的に適用するには？」という問題',
            '「新規アカウント作成を標準化するには？」という問題'
        ],
        tips: 'Control Towerは「これからマルチアカウント環境を構築する」場合の正解。既存環境への適用は計画が必要です。',
        related: ['AWS Organizations', 'Service Control Policy', 'AWS Config']
    },
    'Service Control Policy': {
        icon: '🔐',
        category: 'organization',
        fullName: 'Service Control Policy (SCP)',
        description: 'Organizations内のアカウントやOUに適用するポリシー。IAMポリシーの「上限」として機能し、組織レベルのガバナンスを実現します。',
        features: [
            '許可リスト方式: 明示的に許可したものだけ使用可能',
            '拒否リスト方式: 特定のアクションを明示的に禁止',
            'OU階層での継承: 親OUのSCPが子に継承される',
            'ルートアカウントにも適用: 管理者でも制限可能',
            'IAMとの組み合わせ: 両方で許可されて初めてアクセス可能'
        ],
        useCases: [
            '「特定のリージョン以外の使用を禁止するには？」という問題',
            '「全アカウントでCloudTrailの無効化を防ぐには？」という問題',
            '「特定のインスタンスタイプの使用を制限するには？」という問題'
        ],
        tips: 'SCPは「できることの上限」を設定するもの。SCPだけでは権限は付与されません。IAMポリシーも必要です。',
        related: ['AWS Organizations', 'Control Tower', 'IAM設計']
    },
    'マルチアカウント戦略': {
        icon: '🏠',
        category: 'organization',
        fullName: 'Multi-Account Strategy',
        description: 'ワークロード、環境、チームごとにAWSアカウントを分離する戦略。セキュリティ境界の明確化とブラスト半径の縮小を実現します。',
        features: [
            '環境分離: 開発/ステージング/本番を別アカウントに',
            'ワークロード分離: アプリケーションごとにアカウント分離',
            'セキュリティアカウント: GuardDuty、Security Hub管理',
            'ログアーカイブアカウント: 全アカウントのログを集約',
            '共有サービスアカウント: AD、DNS、Transit Gateway'
        ],
        useCases: [
            '「本番環境を開発者から保護するには？」という問題',
            '「障害の影響範囲を限定するには？」という問題',
            '「コンプライアンス要件を満たすには？」という問題'
        ],
        tips: 'アカウント分離は「課金の分離」「IAMの分離」「リソースの分離」を同時に実現する最も確実な方法です。',
        related: ['AWS Organizations', 'Control Tower', 'AWS RAM']
    },
    'AWS RAM': {
        icon: '🔗',
        category: 'organization',
        fullName: 'AWS Resource Access Manager',
        description: 'AWSアカウント間でリソースを安全に共有するサービス。リソースの重複を避けてコストを削減します。',
        features: [
            'Transit Gateway共有: ネットワーク接続の一元化',
            'サブネット共有: VPCサブネットを複数アカウントで利用',
            'License Manager: ライセンスの組織内共有',
            'Route 53 Resolver: DNS解決ルールの共有',
            'AWS Outposts: オンプレミス拡張の共有'
        ],
        useCases: [
            '「Transit Gatewayを全アカウントで使用するには？」という問題',
            '「VPCを各アカウントに作成せずに共有するには？」という問題',
            '「リソースの重複を避けてコストを削減するには？」という問題'
        ],
        tips: 'RAMで共有できるリソースは限られています。EC2インスタンスなどは共有できません。主にネットワーク関連が多いです。',
        related: ['AWS Organizations', 'Transit Gateway', 'VPC設計パターン']
    },
    'VPC設計パターン': {
        icon: '🌐',
        category: 'network',
        fullName: 'VPC Design Patterns',
        description: 'VPCのサブネット構成、CIDR設計、AZ配置のベストプラクティス。セキュリティと可用性を両立した設計を目指します。',
        features: [
            'マルチAZ構成: 最低2AZ、推奨3AZ',
            'パブリック/プライベートサブネット: 層ごとに分離',
            'CIDR計画: 将来の拡張と他VPCとの重複回避',
            'NATゲートウェイ: プライベートサブネットからのインターネットアクセス',
            'VPCエンドポイント: AWSサービスへのプライベートアクセス'
        ],
        useCases: [
            '「高可用性を確保したVPC設計は？」という問題',
            '「プライベートサブネットからS3にアクセスするには？」という問題',
            '「将来の拡張を考慮したCIDR設計は？」という問題'
        ],
        tips: '/16のVPCを作成し、/24のサブネットに分割するのが一般的。CIDRは他のVPCと重複しないよう計画が重要です。',
        related: ['Transit Gateway', 'PrivateLink', 'ネットワークセキュリティ']
    },
    'Transit Gateway': {
        icon: '🔀',
        category: 'network',
        fullName: 'AWS Transit Gateway',
        description: 'VPCとオンプレミスネットワークを接続するハブ。フルメッシュ接続を簡素化し、中央でルーティングを管理します。',
        features: [
            'ハブ＆スポーク: 中央のTGWに全VPCを接続',
            'ルートテーブル: トラフィックの制御',
            'マルチリージョンピアリング: リージョン間接続',
            'Direct Connect Gateway連携: オンプレミス接続',
            'VPN接続: バックアップ経路'
        ],
        useCases: [
            '「多数のVPCを相互接続するには？」という問題',
            '「オンプレミスと複数VPCを接続するには？」という問題',
            '「ネットワーク構成を簡素化するには？」という問題'
        ],
        tips: 'VPC Peeringは1対1接続で推移的ルーティング不可。3つ以上のVPCを接続する場合はTransit Gatewayが正解です。',
        related: ['VPC設計パターン', 'Direct Connect', 'AWS RAM']
    },
    'Direct Connect': {
        icon: '🔌',
        category: 'network',
        fullName: 'AWS Direct Connect',
        description: 'オンプレミスとAWSを専用線で接続するサービス。安定した帯域幅と低レイテンシーを実現します。',
        features: [
            'Dedicated Connection: 1Gbps/10Gbps/100Gbpsの専用接続',
            'Hosted Connection: パートナー経由の接続',
            'LAG: 複数接続の集約で帯域幅拡大',
            'パブリックVIF: AWSパブリックサービスへのアクセス',
            'プライベートVIF: VPCへのプライベートアクセス',
            'Transit VIF: Transit Gateway経由の接続'
        ],
        useCases: [
            '「オンプレミスとの安定した高帯域接続が必要」という問題',
            '「インターネット経由より低レイテンシーが必要」という問題',
            '「大容量データを定期的に転送する」という問題'
        ],
        tips: '冗長化は「2つのロケーション」での接続が推奨。1つのロケーション内での2接続は障害点が共通になる可能性があります。',
        related: ['Transit Gateway', 'VPC設計パターン', 'ハイブリッドアーキテクチャ']
    },
    'PrivateLink': {
        icon: '🔒',
        category: 'network',
        fullName: 'AWS PrivateLink / VPC Endpoints',
        description: 'VPCからAWSサービスやサードパーティサービスにプライベート接続するサービス。インターネットを経由せずにセキュアにアクセスします。',
        features: [
            'インターフェースエンドポイント: ENIを使用、多くのサービス対応',
            'ゲートウェイエンドポイント: S3とDynamoDB専用、無料',
            'エンドポイントポリシー: アクセス制御',
            'プライベートDNS: サービスエンドポイントの名前解決',
            'クロスアカウント: 他アカウントのサービスにも接続可能'
        ],
        useCases: [
            '「プライベートサブネットからS3にアクセスするには？」という問題',
            '「インターネットを経由せずにAWSサービスを利用するには？」という問題',
            '「データがインターネットに出ることを禁止されている」という問題'
        ],
        tips: 'S3とDynamoDBは無料のゲートウェイエンドポイントを使用。他のサービスは有料のインターフェースエンドポイント。',
        related: ['VPC設計パターン', 'ネットワークセキュリティ', 'セキュリティ設計']
    },
    'ネットワークセキュリティ': {
        icon: '🛡️',
        category: 'network',
        fullName: 'Network Security',
        description: 'VPCのセキュリティを多層で保護する設計。Security Group、NACL、WAF、Shieldを組み合わせた多層防御を実現します。',
        features: [
            'Security Group: ステートフル、インスタンスレベル',
            'NACL: ステートレス、サブネットレベル',
            'AWS WAF: L7の保護、SQLi/XSS対策',
            'AWS Shield: DDoS保護（Standard無料、Advanced有料）',
            'Network Firewall: VPCレベルのステートフルファイアウォール'
        ],
        useCases: [
            '「DDoS攻撃から保護するには？」という問題',
            '「SQLインジェクションを防ぐには？」という問題',
            '「サブネット間のトラフィックを制御するには？」という問題'
        ],
        tips: 'Security Groupはステートフル（戻りトラフィック自動許可）、NACLはステートレス（インバウンド/アウトバウンド両方設定必要）。',
        related: ['VPC設計パターン', 'PrivateLink', 'GuardDuty']
    },
    'Route 53': {
        icon: '🌍',
        category: 'network',
        fullName: 'Amazon Route 53',
        description: 'AWSのDNSサービス。ドメイン登録、DNSルーティング、ヘルスチェックを提供し、グローバルトラフィック管理を実現します。',
        features: [
            'シンプルルーティング: 単一リソースへのルーティング',
            '加重ルーティング: トラフィックの割合指定',
            'レイテンシールーティング: 最も低いレイテンシーのリージョンへ',
            'フェイルオーバールーティング: プライマリ/セカンダリ切り替え',
            '位置情報ルーティング: ユーザーの場所に基づく'
        ],
        useCases: [
            '「ユーザーを最も近いリージョンにルーティングするには？」という問題',
            '「障害時に自動的にDRサイトに切り替えるには？」という問題',
            '「Blue/Greenデプロイでトラフィックを徐々に移行するには？」という問題'
        ],
        tips: 'レイテンシールーティングは「最も近い」ではなく「最もレイテンシーが低い」リージョンにルーティングします。',
        related: ['マルチリージョン設計', 'DR戦略', 'Global Accelerator']
    },
    '6つのR（移行戦略）': {
        icon: '🚀',
        category: 'migration',
        fullName: '6 Rs of Migration',
        description: 'クラウド移行の6つの戦略。ワークロードの特性に応じて最適な戦略を選択します。',
        features: [
            'Rehost（リフト＆シフト）: そのまま移行、最速',
            'Replatform: 一部最適化して移行（例: RDSへ）',
            'Refactor: クラウドネイティブに再設計',
            'Repurchase: SaaSに置き換え',
            'Retain: 移行しない（当面オンプレミスに残す）',
            'Retire: 廃止'
        ],
        useCases: [
            '「最も早くクラウドに移行するには？」→ Rehost',
            '「運用負荷を減らしながら移行するには？」→ Replatform',
            '「クラウドのメリットを最大化するには？」→ Refactor'
        ],
        tips: '多くの場合、まずRehostで移行し、その後Replatform/Refactorで最適化するアプローチが現実的です。',
        related: ['Migration Hub', 'Application Migration Service', 'Database Migration Service']
    },
    'Migration Hub': {
        icon: '📦',
        category: 'migration',
        fullName: 'AWS Migration Hub',
        description: '移行プロジェクトの進捗を一元管理するサービス。複数の移行ツールからの情報を統合してダッシュボードで可視化します。',
        features: [
            '進捗追跡: 全サーバーの移行状況を一元管理',
            'ツール統合: MGN、DMS、SMSなどと連携',
            'Application Discovery Service: オンプレミス環境の検出',
            'Strategy Recommendations: 移行戦略の推奨',
            'Refactor Spaces: マイクロサービス化の支援'
        ],
        useCases: [
            '「大規模移行の進捗を管理するには？」という問題',
            '「オンプレミス環境のサーバー情報を収集するには？」という問題',
            '「移行の依存関係を把握するには？」という問題'
        ],
        tips: 'Application Discovery Serviceには2つのモード: エージェントレス（VMware向け）とエージェント（詳細情報収集）があります。',
        related: ['6つのR（移行戦略）', 'Application Migration Service', 'Database Migration Service']
    },
    'Database Migration Service': {
        icon: '🗄️',
        category: 'migration',
        fullName: 'AWS Database Migration Service (DMS)',
        description: 'データベースをAWSに移行するサービス。同種DB間の移行だけでなく、異種DB間の変換にも対応します。',
        features: [
            '同種移行: Oracle→Oracle、MySQL→MySQLなど',
            '異種移行: Oracle→PostgreSQL、SQL Server→Auroraなど',
            'SCT（Schema Conversion Tool）: スキーマとコードの変換',
            'CDC: 継続的なデータレプリケーション',
            '最小ダウンタイム: 移行中もソースDBを稼働可能'
        ],
        useCases: [
            '「オンプレミスのOracleをAuroraに移行するには？」という問題',
            '「ダウンタイムを最小化してDB移行するには？」という問題',
            '「継続的にデータを同期しながら移行するには？」という問題'
        ],
        tips: '異種移行の場合はSCTでスキーマ変換が必要。同種移行の場合はDMSだけで完結することが多いです。',
        related: ['6つのR（移行戦略）', 'Migration Hub', 'Aurora']
    },
    'Snow Family': {
        icon: '❄️',
        category: 'migration',
        fullName: 'AWS Snow Family',
        description: 'オフラインでデータをAWSに転送するためのデバイス群。ネットワーク帯域の制限や物理的なセキュリティ要件がある場合に使用します。',
        features: [
            'Snowcone: 8TB、小型で持ち運び可能',
            'Snowball Edge Storage: 80TB、大容量データ転送',
            'Snowball Edge Compute: EC2/Lambda実行可能',
            'Snowmobile: 100PB、コンテナトラックサイズ',
            'エッジコンピューティング: 接続が限られた環境での処理'
        ],
        useCases: [
            '「100TBのデータをAWSに移行、帯域幅が限られている」→ Snowball',
            '「ネットワーク接続がない現場でデータ収集」→ Snowcone/Snowball Edge',
            '「エクサバイト規模のデータセンター移行」→ Snowmobile'
        ],
        tips: '計算方法: 1Gbps回線で100TB転送 = 約10日。これより早くしたい場合やセキュリティ要件がある場合はSnow Familyを検討。',
        related: ['6つのR（移行戦略）', 'S3', 'DataSync']
    },
    'Application Migration Service': {
        icon: '🔄',
        category: 'migration',
        fullName: 'AWS Application Migration Service (MGN)',
        description: 'サーバーをAWSにリフト＆シフトで移行するサービス。ブロックレベルのレプリケーションで最小ダウンタイムを実現します。',
        features: [
            'ブロックレベルレプリケーション: OS/アプリをそのまま移行',
            '継続的同期: カットオーバーまで差分同期',
            'テスト起動: 移行前のテスト実行',
            '自動変換: ドライバー、ブートローダーの調整',
            '最小ダウンタイム: カットオーバー時間を短縮'
        ],
        useCases: [
            '「物理サーバーをそのままEC2に移行するには？」という問題',
            '「VMwareのVMをAWSに移行するには？」という問題',
            '「移行のダウンタイムを最小化するには？」という問題'
        ],
        tips: 'CloudEndure Migrationの後継サービス。Rehostアプローチの標準的な選択肢です。',
        related: ['6つのR（移行戦略）', 'Migration Hub', 'EC2']
    },
    'IAM設計': {
        icon: '👤',
        category: 'security',
        fullName: 'IAM Design Principles',
        description: 'Identity and Access Management の設計原則。最小権限、ロールベースアクセス、フェデレーションを実現します。',
        features: [
            '最小権限の原則: 必要な権限のみを付与',
            'IAM Identity Center: シングルサインオン（SSO）',
            'ロールベース: ユーザーではなくロールに権限付与',
            'Permission Boundary: 権限の上限設定',
            'STS: 一時的なセキュリティ認証情報'
        ],
        useCases: [
            '「社内ADユーザーでAWSにログインするには？」という問題',
            '「EC2からS3にアクセスする権限を付与するには？」→ IAMロール',
            '「開発者が作成できる権限の上限を設定するには？」→ Permission Boundary'
        ],
        tips: 'IAMユーザーにアクセスキーを発行するより、IAMロールを使用する方がセキュアです。',
        related: ['Service Control Policy', 'AWS Organizations', 'Secrets Manager']
    },
    'KMS / CloudHSM': {
        icon: '🔑',
        category: 'security',
        fullName: 'Key Management Service / CloudHSM',
        description: '暗号化キーの作成と管理を行うサービス。KMSはマネージド、CloudHSMは専用ハードウェアで提供されます。',
        features: [
            'AWS管理キー: AWSが自動で作成・管理',
            'カスタマー管理キー（CMK）: 顧客が管理',
            'キーポリシー: キーへのアクセス制御',
            '自動ローテーション: 年次でのキー更新',
            'CloudHSM: FIPS 140-2 Level 3準拠の専用HSM'
        ],
        useCases: [
            '「S3データを暗号化するには？」→ SSE-KMS',
            '「キーを自分で完全に管理したい」→ CloudHSM',
            '「コンプライアンス要件でHSMが必要」→ CloudHSM'
        ],
        tips: 'KMSキーにはリージョン制限があります。マルチリージョンキーまたはクロスリージョンでキーをコピーする必要があります。',
        related: ['Secrets Manager', 'IAM設計', 'S3暗号化']
    },
    'Security Hub': {
        icon: '🔍',
        category: 'security',
        fullName: 'AWS Security Hub',
        description: 'セキュリティアラートとコンプライアンス状況を一元管理するサービス。複数のセキュリティサービスからの検出結果を集約します。',
        features: [
            '統合ダッシュボード: 全セキュリティ検出を一覧表示',
            'AWS基礎ベストプラクティス: AWSの推奨基準でチェック',
            'CIS AWS Foundations: 業界標準のベンチマーク',
            'PCI DSS: 決済業界のコンプライアンス',
            '自動修復: EventBridge連携で対応自動化'
        ],
        useCases: [
            '「全アカウントのセキュリティ状況を把握するには？」という問題',
            '「コンプライアンス違反を自動検出するには？」という問題',
            '「セキュリティ検出結果を自動修復するには？」という問題'
        ],
        tips: 'GuardDuty、Inspector、Macieなどの検出結果を集約。Organizations連携で全アカウントを一元管理できます。',
        related: ['GuardDuty', 'AWS Config', 'IAM設計']
    },
    'GuardDuty': {
        icon: '🕵️',
        category: 'security',
        fullName: 'Amazon GuardDuty',
        description: '機械学習を使用した脅威検出サービス。VPC Flow Logs、CloudTrail、DNS Logsを分析して不審なアクティビティを検出します。',
        features: [
            '継続的モニタリング: エージェントレスで動作',
            '機械学習: 異常な動作パターンを検出',
            '脅威インテリジェンス: 既知の悪意あるIPを検出',
            'Organizations統合: 全アカウントを一元監視',
            'マルウェア保護: EC2/EBS上のマルウェア検出'
        ],
        useCases: [
            '「不審なAPIコールを検出するには？」という問題',
            '「クリプトマイニングを検出するには？」という問題',
            '「全アカウントの脅威を一元監視するには？」という問題'
        ],
        tips: 'GuardDutyは検出のみ。自動対応にはEventBridge + Lambdaまたは Security Hubとの連携が必要です。',
        related: ['Security Hub', 'AWS Config', 'ネットワークセキュリティ']
    },
    'Secrets Manager': {
        icon: '🔏',
        category: 'security',
        fullName: 'AWS Secrets Manager',
        description: 'シークレット（パスワード、APIキー等）を安全に保存・管理するサービス。自動ローテーション機能を提供します。',
        features: [
            '暗号化保存: KMSで暗号化',
            '自動ローテーション: Lambdaで定期的にパスワード変更',
            'RDS統合: DB認証情報の自動管理',
            'クロスアカウント: 他アカウントからのアクセス許可',
            '監査: CloudTrailでアクセス記録'
        ],
        useCases: [
            '「DBパスワードを安全に管理するには？」という問題',
            '「APIキーを定期的に自動更新するには？」という問題',
            '「アプリケーションコードにパスワードを含めたくない」という問題'
        ],
        tips: 'Parameter Store（無料）とSecrets Manager（有料）の違い: Secrets Managerは自動ローテーション機能が組み込み。',
        related: ['KMS / CloudHSM', 'IAM設計', 'RDS']
    },
    'AWS Config': {
        icon: '📋',
        category: 'security',
        fullName: 'AWS Config',
        description: 'AWSリソースの設定変更を記録・評価するサービス。Configルールでコンプライアンスを継続的にチェックします。',
        features: [
            '設定履歴: リソースの変更履歴を記録',
            'Configルール: コンプライアンスチェック',
            'マネージドルール: AWSが提供する定義済みルール',
            'カスタムルール: Lambdaでカスタムチェック',
            '自動修復: 違反時のアクション自動実行'
        ],
        useCases: [
            '「S3バケットのパブリックアクセスを検出・修復するには？」という問題',
            '「セキュリティグループの変更を追跡するには？」という問題',
            '「EBSが暗号化されているか確認するには？」という問題'
        ],
        tips: 'Config + SSM Automation で自動修復が可能。「検出→修復」の自動化パターンでよく出題されます。',
        related: ['Security Hub', 'Control Tower', 'Systems Manager']
    },
    'Reserved Instances': {
        icon: '💰',
        category: 'cost',
        fullName: 'Reserved Instances (RI)',
        description: '1年または3年のコミットメントで大幅な割引を受けられる購入オプション。EC2、RDS、ElastiCache等で利用可能です。',
        features: [
            'Standard RI: 最大72%割引、変更制限あり',
            'Convertible RI: 最大66%割引、インスタンスタイプ変更可',
            '支払いオプション: 全前払い、一部前払い、前払いなし',
            '容量予約: 指定AZでの容量確保（オプション）',
            'リージョン適用: 同一リージョン内で自動適用'
        ],
        useCases: [
            '「常時稼働のワークロードのコストを削減するには？」という問題',
            '「将来のインスタンス変更の可能性があるが割引を受けたい」→ Convertible RI',
            '「特定のAZで容量を確保したい」→ Zonal RI'
        ],
        tips: 'Standard RIは交換不可だがMarketplaceで売却可能。Convertible RIは交換可能だが売却不可。',
        related: ['Savings Plans', 'Spot Instances', 'Cost Explorer']
    },
    'Savings Plans': {
        icon: '💵',
        category: 'cost',
        fullName: 'Savings Plans',
        description: '1時間あたりの使用量をコミットすることで割引を受けるプラン。RIより柔軟性が高く、複数サービスに適用可能です。',
        features: [
            'Compute Savings Plans: EC2、Fargate、Lambdaに適用',
            'EC2 Instance Savings Plans: 特定リージョン・ファミリー',
            'SageMaker Savings Plans: ML ワークロード向け',
            '自動適用: 条件に合う使用量に自動で割引',
            '柔軟性: インスタンスタイプ、OS、リージョン変更可'
        ],
        useCases: [
            '「複数サービス（EC2、Lambda、Fargate）でコスト削減したい」→ Compute SP',
            '「将来のインスタンス変更に備えつつ割引を受けたい」という問題',
            '「RIより管理をシンプルにしたい」という問題'
        ],
        tips: 'Savings Plansは購入後の管理が楽。複数サービスを使っている場合はCompute SPが便利です。',
        related: ['Reserved Instances', 'Spot Instances', 'Cost Explorer']
    },
    'Spot Instances': {
        icon: '🎯',
        category: 'cost',
        fullName: 'EC2 Spot Instances',
        description: 'AWSの余剰キャパシティを最大90%割引で利用できるオプション。中断を許容できるワークロードに最適です。',
        features: [
            '最大90%割引: オンデマンドと比較',
            '2分前通知: 中断前にメタデータで通知',
            'Spot Fleet: 複数インスタンスタイプ/AZで可用性向上',
            '混合インスタンス: オンデマンド + Spotの組み合わせ',
            'Spot Block: 1-6時間の連続使用を確保（廃止傾向）'
        ],
        useCases: [
            '「バッチ処理のコストを削減するには？」という問題',
            '「コンテナワークロードでコスト最適化するには？」という問題',
            '「中断に強いアーキテクチャにするには？」という問題'
        ],
        tips: 'Spot中断に備えて、チェックポイント保存、複数AZ/インスタンスタイプの使用が重要です。',
        related: ['Reserved Instances', 'Savings Plans', 'Auto Scaling']
    },
    'Cost Explorer': {
        icon: '📈',
        category: 'cost',
        fullName: 'AWS Cost Explorer',
        description: 'AWSコストと使用量を可視化・分析するツール。過去のトレンド分析と将来の予測が可能です。',
        features: [
            'コスト可視化: サービス、アカウント、タグ別',
            '予測: 将来のコストを予測',
            'RI/SP推奨: 最適な購入オプションを推奨',
            'リソース最適化: 未使用/低使用リソースの特定',
            'コスト配分タグ: タグベースのコスト追跡'
        ],
        useCases: [
            '「部門別のコストを把握するには？」→ コスト配分タグ',
            '「RI購入の推奨を得るには？」→ Cost Explorer推奨',
            '「将来のコストを予測するには？」という問題'
        ],
        tips: 'コスト配分タグは有効化が必要。タグ戦略を先に決めてから運用開始することが重要です。',
        related: ['Budgets', 'タグ戦略', 'Savings Plans']
    },
    'Budgets': {
        icon: '⚠️',
        category: 'cost',
        fullName: 'AWS Budgets',
        description: 'コストと使用量の予算を設定し、閾値を超えた場合にアラートを発信するサービス。自動アクションも設定可能です。',
        features: [
            'コスト予算: 月額予算の設定',
            '使用量予算: サービス使用量の監視',
            'RI/SP利用率予算: 予約の活用状況監視',
            'SNS通知: 閾値超過時のアラート',
            'Budget Actions: EC2/RDS停止などの自動実行'
        ],
        useCases: [
            '「予算超過を防ぐには？」という問題',
            '「開発環境のコストを自動制御するには？」→ Budget Actions',
            '「RIの利用率を監視するには？」という問題'
        ],
        tips: 'Budget Actionsで「80%で警告、100%でリソース停止」のような段階的制御が可能です。',
        related: ['Cost Explorer', 'タグ戦略', 'AWS Organizations']
    },
    'タグ戦略': {
        icon: '🏷️',
        category: 'cost',
        fullName: 'Tagging Strategy',
        description: 'リソースにメタデータ（タグ）を付与して管理する戦略。コスト配分、ガバナンス、自動化に活用します。',
        features: [
            '必須タグ: Environment、Owner、CostCenter等',
            'タグポリシー: Organizations で標準化を強制',
            'コスト配分タグ: Cost Explorerでのコスト分析',
            'AWS Config: タグ付けルールのコンプライアンス',
            'Resource Groups: タグベースのリソースグループ化'
        ],
        useCases: [
            '「部門別コストを追跡するには？」→ CostCenterタグ + コスト配分',
            '「タグ付けを強制するには？」→ タグポリシー + SCP',
            '「環境ごとにリソースを管理するには？」→ Environmentタグ'
        ],
        tips: '後からタグを追加するのは大変。プロジェクト開始時にタグ戦略を決めることが重要です。',
        related: ['Cost Explorer', 'AWS Organizations', 'AWS Config']
    },
    'DR戦略': {
        icon: '🔄',
        category: 'resilience',
        fullName: 'Disaster Recovery Strategies',
        description: '災害復旧のための4つの主要戦略。コストとRTO/RPOのトレードオフに応じて選択します。',
        features: [
            'Backup & Restore: 最低コスト、RTO/RPO長い',
            'Pilot Light: 最小限のコア機能を常時稼働',
            'Warm Standby: 縮小版を常時稼働、すぐ拡張可能',
            'Multi-Site Active-Active: 両サイトでアクティブ、最小RTO'
        ],
        useCases: [
            '「最もコスト効率の良いDRは？」→ Backup & Restore',
            '「RTOを数分にしたい」→ Multi-Site Active-Active',
            '「RTO 1時間、コストを抑えたい」→ Pilot Light/Warm Standby'
        ],
        tips: 'RTO（復旧目標時間）とRPO（復旧目標地点）の要件を明確にしてから戦略を選択します。',
        related: ['マルチリージョン設計', 'AWS Backup', 'Route 53']
    },
    'マルチリージョン設計': {
        icon: '🌏',
        category: 'resilience',
        fullName: 'Multi-Region Architecture',
        description: '複数のAWSリージョンにまたがるアーキテクチャ。グローバルな可用性とディザスタリカバリを実現します。',
        features: [
            'Aurora Global Database: 1秒未満のクロスリージョンレプリケーション',
            'DynamoDB Global Tables: マルチリージョンアクティブ-アクティブ',
            'S3 Cross-Region Replication: オブジェクトの自動複製',
            'Global Accelerator: エニーキャストIPでグローバルルーティング',
            'CloudFront: エッジでのコンテンツ配信'
        ],
        useCases: [
            '「グローバルユーザーへのレイテンシーを改善するには？」という問題',
            '「リージョン障害に備えるには？」という問題',
            '「アクティブ-アクティブのDB構成にするには？」→ DynamoDB Global Tables'
        ],
        tips: 'Aurora Global Databaseは読み取りをグローバル化できますが、書き込みはプライマリリージョンのみ。DynamoDB Global Tablesは真のマルチマスター。',
        related: ['DR戦略', 'Route 53', 'Global Accelerator']
    },
    'Auto Scaling': {
        icon: '📊',
        category: 'resilience',
        fullName: 'AWS Auto Scaling',
        description: '需要に応じてリソースを自動的にスケールするサービス。EC2、ECS、DynamoDB等に対応します。',
        features: [
            'ターゲット追跡: CPU使用率等の目標値を維持',
            'ステップスケーリング: 閾値に応じた段階的スケール',
            'スケジュールスケーリング: 時間ベースのスケール',
            '予測スケーリング: 機械学習で需要を予測',
            'Application Auto Scaling: EC2以外のサービス対応'
        ],
        useCases: [
            '「CPU使用率を70%に維持するには？」→ ターゲット追跡',
            '「毎朝9時にスケールアウトするには？」→ スケジュール',
            '「過去のパターンから自動でスケールするには？」→ 予測スケーリング'
        ],
        tips: 'スケールインの保護期間（クールダウン）を適切に設定しないと、頻繁なスケールイン/アウトが発生します。',
        related: ['スケーラビリティ設計', 'Spot Instances', 'ECS/EKS']
    },
    'AWS Backup': {
        icon: '💾',
        category: 'resilience',
        fullName: 'AWS Backup',
        description: 'AWSリソースのバックアップを一元管理するサービス。ポリシーベースで自動バックアップと保持期間を管理します。',
        features: [
            '一元管理: EC2、EBS、RDS、DynamoDB、EFS、FSx対応',
            'バックアップポリシー: スケジュールと保持期間を定義',
            'クロスリージョンコピー: DR用に別リージョンへ複製',
            'クロスアカウントコピー: 別アカウントへのバックアップ',
            'ボールトロック: 削除防止（コンプライアンス要件）'
        ],
        useCases: [
            '「複数サービスのバックアップを一元管理するには？」という問題',
            '「バックアップを別リージョンに自動コピーするには？」という問題',
            '「バックアップの削除を防止するには？」→ ボールトロック'
        ],
        tips: 'Organizations連携でバックアップポリシーを組織全体に適用できます。',
        related: ['DR戦略', 'マルチリージョン設計', 'AWS Organizations']
    },
    'Resilience Hub': {
        icon: '🔧',
        category: 'resilience',
        fullName: 'AWS Resilience Hub',
        description: 'アプリケーションのレジリエンスを評価・管理するサービス。RTO/RPO目標に対する現状のギャップを特定します。',
        features: [
            'アプリケーション定義: リソースをアプリケーション単位でグループ化',
            'ポリシー設定: RTO/RPO目標の定義',
            'レジリエンス評価: 現在のアーキテクチャを分析',
            '推奨事項: 目標達成のための改善提案',
            'テスト: FISと連携した障害テスト'
        ],
        useCases: [
            '「アプリケーションのレジリエンス状況を評価するには？」という問題',
            '「RTO/RPO目標を達成できているか確認するには？」という問題',
            '「レジリエンス改善の推奨事項を得るには？」という問題'
        ],
        tips: 'Resilience HubはFault Injection Simulatorと連携して、推奨事項の検証テストが可能です。',
        related: ['DR戦略', 'Fault Injection Simulator', 'AWS Backup']
    },
    'Fault Injection Simulator': {
        icon: '🧪',
        category: 'resilience',
        fullName: 'AWS Fault Injection Simulator (FIS)',
        description: '制御された障害を注入してシステムの回復力をテストするサービス。カオスエンジニアリングを実践します。',
        features: [
            'EC2障害: インスタンス停止、CPU/メモリストレス',
            'ネットワーク障害: レイテンシー追加、パケットロス',
            'AZ障害: 特定AZのリソースを停止',
            'RDS障害: フェイルオーバーのテスト',
            '停止条件: 問題発生時に自動停止'
        ],
        useCases: [
            '「本番環境の回復力をテストするには？」という問題',
            '「AZ障害時の動作を確認するには？」という問題',
            '「カオスエンジニアリングを実践するには？」という問題'
        ],
        tips: '本番環境でのテストは停止条件（Stop Conditions）を必ず設定。CloudWatchアラームと連携して安全にテストします。',
        related: ['Resilience Hub', 'DR戦略', 'Auto Scaling']
    },
    'SAP試験の考え方': {
        icon: '💡',
        category: 'design',
        fullName: 'SAP Exam Mindset',
        description: 'AWS SAP試験で正解を導くための考え方とアプローチ。問題文の要件を正確に把握し、AWSのベストプラクティスに沿った解答を選択します。',
        features: [
            '要件の把握: 「最もコスト効率」「運用負荷最小」「最もセキュア」等',
            'マネージドサービス優先: 自前構築より AWS サービスを選択',
            'スケーラビリティ重視: 水平スケール、サーバーレス',
            '疎結合: SQS、SNS、EventBridge を活用',
            '多層防御: セキュリティは複数レイヤーで'
        ],
        useCases: [
            '「すべての要件を満たす」選択肢が複数ある場合は最もシンプルなものを選ぶ',
            '「EC2で自前構築」vs「マネージドサービス」→ 通常はマネージド',
            '問題文の「must」「should」の違いに注意',
            '4つの選択肢のうち2つは明らかに間違い、残り2つから選ぶ'
        ],
        tips: '試験時間は180分で75問。1問あたり約2.5分。わからない問題はフラグを立てて後で戻る。消去法を活用。',
        related: ['Well-Architected Framework', '疎結合アーキテクチャ', 'サーバーレスファースト']
    }
};
