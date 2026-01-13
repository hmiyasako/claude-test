// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation with stagger effect
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });

    // Setup filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterServices(category);
            updateActiveButton(button);
        });
    });

    // Add click effect to cards
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        });
    });

    // Display service count
    updateServiceCount('all');
});

// Filter services based on category
function filterServices(category) {
    let visibleCount = 0;

    serviceCards.forEach((card, index) => {
        const cardCategory = card.dataset.category;

        if (category === 'all' || cardCategory === category) {
            // Show card with animation
            setTimeout(() => {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeIn 0.5s ease ${index * 0.03}s forwards`;
                }, 10);
            }, index * 30);
            visibleCount++;
        } else {
            // Hide card
            card.classList.add('hidden');
        }
    });

    updateServiceCount(category);
}

// Update active button style
function updateActiveButton(activeButton) {
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Update service count display
function updateServiceCount(category) {
    const count = category === 'all'
        ? serviceCards.length
        : document.querySelectorAll(`.service-card[data-category="${category}"]`).length;

    console.log(`表示中のサービス数: ${count}`);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '8') {
        const index = parseInt(e.key) - 1;
        if (filterButtons[index]) {
            filterButtons[index].click();
        }
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.transform = 'translateY(-5px)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// Add search functionality
function createSearchBar() {
    const nav = document.querySelector('.filter-nav .container');
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = 'width: 100%; margin-top: 15px;';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'サービスを検索...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 12px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 1rem;
        outline: none;
        transition: all 0.3s ease;
    `;

    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#FF9900';
        searchInput.style.boxShadow = '0 0 0 3px rgba(255, 153, 0, 0.1)';
    });

    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e0e0e0';
        searchInput.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchServices(searchTerm);
    });

    searchContainer.appendChild(searchInput);
    nav.appendChild(searchContainer);
}

// Search services by name or description
function searchServices(searchTerm) {
    serviceCards.forEach((card) => {
        const serviceName = card.querySelector('h3').textContent.toLowerCase();
        const serviceDesc = card.querySelector('h4').textContent.toLowerCase();
        const serviceText = card.querySelector('.card-body p').textContent.toLowerCase();

        const matches = serviceName.includes(searchTerm) ||
                       serviceDesc.includes(searchTerm) ||
                       serviceText.includes(searchTerm);

        if (matches || searchTerm === '') {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Initialize search bar
createSearchBar();

// Add category statistics
function showCategoryStats() {
    const categories = {};

    serviceCards.forEach(card => {
        const category = card.dataset.category;
        categories[category] = (categories[category] || 0) + 1;
    });

    console.log('カテゴリー別サービス数:', categories);
    return categories;
}

// Display stats on load
showCategoryStats();

// Add export functionality (for learning purposes)
function exportServicesList() {
    const services = [];

    serviceCards.forEach(card => {
        const service = {
            name: card.querySelector('h3').textContent,
            fullName: card.querySelector('h4').textContent,
            description: card.querySelector('.card-body p').textContent,
            category: card.dataset.category,
            tags: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent)
        };
        services.push(service);
    });

    return services;
}

// Make export function available globally
window.exportServicesList = exportServicesList;

// Add dynamic theme support
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Add performance optimization: Intersection Observer for lazy animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards for better performance
serviceCards.forEach(card => {
    cardObserver.observe(card);
});

// Detailed service information database
const serviceDetails = {
    'EC2': {
        icon: '☁️',
        category: 'compute',
        fullName: 'Amazon Elastic Compute Cloud',
        description: 'EC2は、クラウド上で安全かつスケーラブルな仮想サーバーを提供するサービスです。必要に応じてコンピューティング能力を増減でき、数分で新しいサーバーインスタンスを起動できます。',
        features: [
            '幅広いインスタンスタイプから選択可能（汎用、コンピューティング最適化、メモリ最適化など）',
            'オートスケーリングによる自動的な容量調整',
            '秒単位の課金で無駄なコストを削減',
            'Elastic Load Balancingとの統合で高可用性を実現',
            'さまざまなOSとアプリケーションに対応'
        ],
        useCases: [
            'Webアプリケーションのホスティング',
            'バッチ処理やビッグデータ分析',
            '開発・テスト環境の構築',
            'ハイパフォーマンスコンピューティング（HPC）',
            'ゲームサーバーのホスティング'
        ],
        pricing: '使用した分だけ支払うオンデマンド料金、リザーブドインスタンス（1年または3年契約で最大72%割引）、スポットインスタンス（未使用容量を最大90%割引で利用）から選択可能。',
        related: ['EBS', 'VPC', 'Lambda', 'ECS']
    },
    'Lambda': {
        icon: '⚡',
        category: 'compute',
        fullName: 'AWS Lambda',
        description: 'Lambdaは、サーバーの管理なしでコードを実行できるサーバーレスコンピューティングサービスです。イベントに応じて自動的にコードを実行し、必要なコンピューティングリソースを自動管理します。',
        features: [
            'サーバー管理が不要、コードだけに集中できる',
            'ミリ秒単位で自動スケーリング',
            '実行時間に応じた従量課金（100万リクエスト/月まで無料）',
            '多数のプログラミング言語をサポート（Python、Node.js、Java、Go など）',
            'AWSサービスやサードパーティサービスとの連携が容易'
        ],
        useCases: [
            'リアルタイムファイル処理（画像のリサイズなど）',
            'APIバックエンドの構築',
            'データの変換とETL処理',
            'IoTバックエンド',
            'Webアプリケーションの非同期タスク処理'
        ],
        pricing: 'リクエスト数と実行時間に基づく従量課金。月間100万リクエストと40万GB秒のコンピューティング時間まで無料利用枠あり。',
        related: ['API Gateway', 'DynamoDB', 'S3', 'CloudWatch']
    },
    'ECS': {
        icon: '📦',
        category: 'compute',
        fullName: 'Amazon Elastic Container Service',
        description: 'ECSは、Dockerコンテナを簡単にデプロイ、管理、スケーリングできるフルマネージド型コンテナオーケストレーションサービスです。',
        features: [
            'Dockerコンテナのフルマネージドオーケストレーション',
            'AWS FargateまたはEC2でコンテナを実行可能',
            'Auto Scalingとロードバランシングの統合',
            'セキュリティグループとIAMによる細かいアクセス制御',
            'CloudWatchによる包括的な監視'
        ],
        useCases: [
            'マイクロサービスアーキテクチャの実装',
            'バッチ処理ジョブの実行',
            'CI/CDパイプラインの構築',
            'ハイブリッドアプリケーションのデプロイ',
            '機械学習モデルのトレーニングと推論'
        ],
        pricing: 'Fargateを使用する場合は、vCPUとメモリリソースに基づく課金。EC2起動タイプの場合は、基盤となるEC2インスタンスの料金のみ。',
        related: ['EC2', 'ECR', 'Fargate', 'EKS']
    },
    'S3': {
        icon: '🗄️',
        category: 'storage',
        fullName: 'Amazon Simple Storage Service',
        description: 'S3は、業界最高レベルのスケーラビリティ、データ可用性、セキュリティ、パフォーマンスを提供するオブジェクトストレージサービスです。',
        features: [
            '99.999999999%（イレブンナイン）の耐久性',
            '無制限のストレージ容量',
            'ストレージクラスの自動階層化',
            'バージョニングとライフサイクル管理',
            '強力な暗号化とアクセス制御'
        ],
        useCases: [
            'データレイクとビッグデータ分析',
            'バックアップとアーカイブ',
            '静的Webサイトのホスティング',
            'メディアファイルの保存と配信',
            'アプリケーションデータの保存'
        ],
        pricing: 'ストレージ容量、リクエスト数、データ転送量に基づく従量課金。ストレージクラス（S3 Standard、S3 Intelligent-Tiering、S3 Glacierなど）により料金が異なる。',
        related: ['CloudFront', 'Lambda', 'Athena', 'Glacier']
    },
    'EBS': {
        icon: '💾',
        category: 'storage',
        fullName: 'Amazon Elastic Block Store',
        description: 'EBSは、EC2インスタンス用の高性能ブロックストレージサービスです。永続的なストレージボリュームを提供し、データベースやファイルシステムに最適です。',
        features: [
            '高IOPS、低レイテンシーのパフォーマンス',
            'スナップショットによる簡単なバックアップ',
            'ボリュームの動的なサイズ変更',
            'SSD（汎用/プロビジョンドIOPS）とHDDボリュームタイプ',
            '保存データの暗号化'
        ],
        useCases: [
            'リレーショナルデータベース（MySQL、PostgreSQLなど）',
            'NoSQLデータベース',
            'エンタープライズアプリケーション',
            'ビッグデータ分析エンジン',
            'ファイルシステムとログストレージ'
        ],
        pricing: 'プロビジョニングしたストレージ容量（GB/月）、IOPS、スループット、スナップショットストレージに基づく課金。',
        related: ['EC2', 'RDS', 'S3']
    },
    'Glacier': {
        icon: '🧊',
        category: 'storage',
        fullName: 'Amazon S3 Glacier',
        description: 'Glacierは、長期アーカイブとデジタル保存のための安全で耐久性の高い低コストストレージサービスです。',
        features: [
            'S3と同じ99.999999999%の耐久性',
            '非常に低コストなアーカイブストレージ',
            '複数の取り出しオプション（1分から12時間）',
            'Vault Lockによるコンプライアンス管理',
            'ライフサイクルポリシーによる自動アーカイブ'
        ],
        useCases: [
            'メディアアセットのアーカイブ',
            '医療記録の長期保管',
            '規制データのコンプライアンスアーカイブ',
            'デジタル保存と文書管理',
            'バックアップとディザスタリカバリ'
        ],
        pricing: 'アーカイブストレージは1GB/月あたり数セント。取り出し料金と取り出し時間は選択したオプションにより異なる。',
        related: ['S3', 'Storage Gateway', 'Backup']
    },
    'RDS': {
        icon: '🗃️',
        category: 'database',
        fullName: 'Amazon Relational Database Service',
        description: 'RDSは、クラウド内でリレーショナルデータベースのセットアップ、運用、スケーリングを簡単に実行できるマネージド型サービスです。',
        features: [
            '6つのデータベースエンジンをサポート（MySQL、PostgreSQL、MariaDB、Oracle、SQL Server、Aurora）',
            '自動バックアップとポイントインタイムリカバリ',
            'Multi-AZデプロイによる高可用性',
            '読み取りレプリカによるスケーラビリティ向上',
            '自動パッチ適用とメンテナンス'
        ],
        useCases: [
            'Webアプリケーションデータベース',
            'モバイルアプリケーションのバックエンド',
            'eコマースプラットフォーム',
            'ERPシステム',
            'CRMアプリケーション'
        ],
        pricing: 'インスタンスタイプ、ストレージ容量、バックアップストレージ、データ転送量に基づく従量課金。',
        related: ['Aurora', 'DynamoDB', 'EC2', 'Lambda']
    },
    'DynamoDB': {
        icon: '⚡',
        category: 'database',
        fullName: 'Amazon DynamoDB',
        description: 'DynamoDBは、どんな規模でも10ミリ秒未満のパフォーマンスを実現する、フルマネージドなNoSQLデータベースサービスです。',
        features: [
            '一貫した1桁ミリ秒のレイテンシー',
            '完全自動のスケーリング',
            '組み込みのセキュリティと暗号化',
            'グローバルテーブルによるマルチリージョンレプリケーション',
            'ポイントインタイムリカバリと自動バックアップ'
        ],
        useCases: [
            'モバイルアプリとゲームのバックエンド',
            'IoTアプリケーションのデータ保存',
            'リアルタイム入札プラットフォーム',
            'ショッピングカート',
            'セッション管理'
        ],
        pricing: 'オンデマンドモード（リクエスト数に応じた課金）またはプロビジョニングモード（事前に容量を指定）から選択可能。',
        related: ['Lambda', 'S3', 'API Gateway', 'Kinesis']
    },
    'Aurora': {
        icon: '🌟',
        category: 'database',
        fullName: 'Amazon Aurora',
        description: 'Auroraは、MySQL・PostgreSQLと互換性のあるクラウド向けリレーショナルデータベースで、商用データベースのパフォーマンスと可用性をオープンソースの1/10のコストで提供します。',
        features: [
            'MySQL・PostgreSQLの最大5倍・3倍のスループット',
            '最大128TBまで自動スケーリング',
            '6つのデータコピーを3つのAZに複製',
            '自動フェイルオーバー（30秒未満）',
            'サーバーレスオプション（Aurora Serverless）'
        ],
        useCases: [
            'エンタープライズアプリケーション',
            'SaaS（Software as a Service）アプリケーション',
            'Webアプリケーション',
            'モバイルゲーム',
            'オンライントランザクション処理（OLTP）'
        ],
        pricing: 'インスタンス時間、ストレージ（GB/月）、I/Oリクエスト、バックアップストレージに基づく課金。Aurora Serverlessは使用したデータベース容量に応じた課金。',
        related: ['RDS', 'DynamoDB', 'ElastiCache']
    },
    'VPC': {
        icon: '🌐',
        category: 'networking',
        fullName: 'Amazon Virtual Private Cloud',
        description: 'VPCは、論理的に分離された仮想ネットワークをAWSクラウド内に定義できるサービスです。完全にコントロール可能なネットワーク環境を構築できます。',
        features: [
            'IPアドレス範囲の選択',
            'サブネット、ルートテーブル、ネットワークゲートウェイの作成',
            'セキュリティグループとネットワークACL',
            'VPNとDirect Connect接続',
            'VPCピアリングとTransit Gateway'
        ],
        useCases: [
            'プライベートなWebアプリケーション環境',
            'マルチティアWebアプリケーション',
            'ハイブリッドクラウド環境',
            'ディザスタリカバリ環境',
            'セキュアなバックアップとストレージ'
        ],
        pricing: 'VPC自体は無料。NAT Gateway、VPN接続、VPCエンドポイント、Traffic Mirroringなどのオプション機能に課金。',
        related: ['EC2', 'Route 53', 'CloudFront', 'Direct Connect']
    },
    'CloudFront': {
        icon: '🚀',
        category: 'networking',
        fullName: 'Amazon CloudFront',
        description: 'CloudFrontは、低レイテンシーと高速転送でコンテンツを配信する高速コンテンツ配信ネットワーク（CDN）サービスです。',
        features: [
            '世界中に分散した450以上のエッジロケーション',
            'DDoS攻撃に対する保護（AWS Shield統合）',
            'SSL/TLS暗号化とカスタムSSL証明書',
            'Lambda@Edgeによるエッジコンピューティング',
            'リアルタイムメトリクスとログ'
        ],
        useCases: [
            '静的・動的Webコンテンツの配信',
            'ビデオストリーミング（ライブ・オンデマンド）',
            'ソフトウェアダウンロードの配信',
            'APIアクセラレーション',
            'セキュアなコンテンツ配信'
        ],
        pricing: 'データ転送量とリクエスト数に基づく従量課金。リージョンにより料金が異なる。',
        related: ['S3', 'Route 53', 'WAF', 'Shield']
    },
    'Route 53': {
        icon: '🗺️',
        category: 'networking',
        fullName: 'Amazon Route 53',
        description: 'Route 53は、高可用性でスケーラブルなDNS（Domain Name System）Webサービスです。ドメイン名の管理とルーティングを提供します。',
        features: [
            '100% SLAの可用性保証',
            '様々なルーティングポリシー（シンプル、加重、レイテンシーベース、フェイルオーバーなど）',
            'ヘルスチェックと自動フェイルオーバー',
            'ドメイン登録サービス',
            'DNSSEC署名'
        ],
        useCases: [
            'Webサイトとアプリケーションのルーティング',
            'グローバルトラフィック管理',
            'ディザスタリカバリ',
            'マイクロサービス間のサービスディスカバリ',
            'ハイブリッドクラウド環境のDNS管理'
        ],
        pricing: 'ホストゾーン（月額$0.50/ゾーン）、クエリ数、ヘルスチェック、ドメイン登録料に基づく課金。',
        related: ['CloudFront', 'ELB', 'VPC', 'S3']
    },
    'IAM': {
        icon: '🔐',
        category: 'security',
        fullName: 'AWS Identity and Access Management',
        description: 'IAMは、AWSサービスとリソースへのアクセスを安全に管理するためのサービスです。きめ細かいアクセス制御を実現します。',
        features: [
            'ユーザー、グループ、ロールの作成と管理',
            'きめ細かいアクセス許可ポリシー',
            '多要素認証（MFA）のサポート',
            'AWSサービス間のセキュアな連携',
            '一時的なセキュリティ認証情報の発行'
        ],
        useCases: [
            'ユーザーとアプリケーションのアクセス管理',
            'クロスアカウントアクセス',
            'サービス間の権限委任',
            'フェデレーティッドアクセス（SAML、OAuth）',
            'セキュリティ監査とコンプライアンス'
        ],
        pricing: '無料。IAM自体に料金はかかりません。',
        related: ['Cognito', 'Organizations', 'CloudTrail', 'KMS']
    },
    'Cognito': {
        icon: '👤',
        category: 'security',
        fullName: 'Amazon Cognito',
        description: 'Cognitoは、Webアプリケーションとモバイルアプリケーションに、ユーザー認証、認可、ユーザー管理機能を簡単に追加できるサービスです。',
        features: [
            'ユーザープールによるサインアップ・サインイン',
            'ソーシャルIDプロバイダとの統合（Facebook、Google、Amazonなど）',
            'SAML・OpenID Connect対応',
            'Multi-Factor Authentication（MFA）',
            'ユーザーデータの同期'
        ],
        useCases: [
            'モバイルアプリのユーザー認証',
            'Webアプリケーションのログイン機能',
            'ソーシャルログインの実装',
            'ゲストアクセスの管理',
            'エンタープライズIDフェデレーション'
        ],
        pricing: '月間アクティブユーザー（MAU）数に基づく課金。最初の5万MAUまで無料。',
        related: ['IAM', 'API Gateway', 'Lambda', 'AppSync']
    },
    'KMS': {
        icon: '🔑',
        category: 'security',
        fullName: 'AWS Key Management Service',
        description: 'KMSは、暗号化キーの作成と管理を簡単に行え、さまざまなAWSサービスとアプリケーション全体でキーの使用を制御できるマネージド型サービスです。',
        features: [
            'マネージド型暗号化キーの作成・管理',
            'AWSサービスとの統合による自動暗号化',
            'CloudTrailによるキー使用の監査',
            'カスタマーマスターキー（CMK）のローテーション',
            'FIPS 140-2検証済みハードウェアセキュリティモジュール'
        ],
        useCases: [
            'データベースの暗号化',
            'S3オブジェクトの暗号化',
            'EBSボリュームの暗号化',
            'アプリケーションの秘密情報管理',
            'デジタル署名の作成'
        ],
        pricing: '作成したカスタマーマスターキー（CMK）の数とAPI呼び出し回数に基づく課金。',
        related: ['S3', 'EBS', 'RDS', 'Secrets Manager']
    },
    'CloudWatch': {
        icon: '📊',
        category: 'analytics',
        fullName: 'Amazon CloudWatch',
        description: 'CloudWatchは、AWSリソースとAWS上で実行するアプリケーションのモニタリングと管理サービスです。メトリクス、ログ、イベントを一元管理できます。',
        features: [
            'リアルタイムメトリクスの収集と可視化',
            'カスタムメトリクスの作成',
            'ログの収集、保存、分析',
            'アラームとアクションの自動化',
            'ダッシュボードによる統合ビュー'
        ],
        useCases: [
            'アプリケーションパフォーマンスの監視',
            'リソース使用率の最適化',
            'オートスケーリングのトリガー',
            'ログ分析とトラブルシューティング',
            'セキュリティイベントの検出'
        ],
        pricing: 'メトリクス、ダッシュボード、アラーム、ログデータの取り込み・保存・分析に基づく従量課金。',
        related: ['EC2', 'Lambda', 'ECS', 'X-Ray']
    },
    'Athena': {
        icon: '🔬',
        category: 'analytics',
        fullName: 'Amazon Athena',
        description: 'Athenaは、標準SQLを使用してS3内のデータを直接分析できるインタラクティブなクエリサービスです。サーバーレスで、インフラの管理が不要です。',
        features: [
            'サーバーレスで、インフラ管理不要',
            '標準SQLによる直感的なクエリ',
            '様々なデータフォーマットに対応（CSV、JSON、Parquet、ORCなど）',
            '高速なクエリパフォーマンス',
            'JDBC・ODBCドライバによるBIツール連携'
        ],
        useCases: [
            'ログファイルの分析',
            'データレイクのクエリ',
            'アドホック分析',
            'ビジネスレポートの作成',
            'セキュリティ分析'
        ],
        pricing: 'スキャンされたデータ量に基づく従量課金（1TBあたり$5）。クエリを実行しない限り料金は発生しない。',
        related: ['S3', 'Glue', 'QuickSight', 'EMR']
    },
    'QuickSight': {
        icon: '📈',
        category: 'analytics',
        fullName: 'Amazon QuickSight',
        description: 'QuickSightは、高速でクラウドベースのビジネスインテリジェンス（BI）サービスです。インタラクティブなダッシュボードを簡単に作成できます。',
        features: [
            '機械学習を活用したインサイト',
            'SPICEエンジンによる高速なクエリ',
            '自動データディスカバリー',
            'モバイル対応のダッシュボード',
            'エンタープライズセキュリティとガバナンス'
        ],
        useCases: [
            'ビジネスダッシュボードの作成',
            'セルフサービスBI',
            'データ可視化とレポーティング',
            '組み込み分析',
            '予測分析とML Insights'
        ],
        pricing: 'ユーザータイプ（Author、Reader）と使用量に基づく課金。Readerは1セッションあたりの課金も選択可能。',
        related: ['Athena', 'RDS', 'Redshift', 'S3']
    },
    'CodeCommit': {
        icon: '💻',
        category: 'developer',
        fullName: 'AWS CodeCommit',
        description: 'CodeCommitは、セキュアで高可用性のプライベートGitリポジトリをホストするフルマネージド型ソースコントロールサービスです。',
        features: [
            'プライベートGitリポジトリのホスティング',
            '無制限のリポジトリとストレージ',
            '保存データと転送データの暗号化',
            'IAMとの統合によるアクセス制御',
            'プルリクエストとコードレビュー機能'
        ],
        useCases: [
            'ソースコード管理',
            'チーム開発の協業',
            'CI/CDパイプラインのソース',
            'バージョン管理',
            'コードレビューとコラボレーション'
        ],
        pricing: 'アクティブユーザー数に基づく課金。5ユーザーまで無料、追加ユーザーあたり月額$1。',
        related: ['CodeBuild', 'CodeDeploy', 'CodePipeline']
    },
    'CodeBuild': {
        icon: '🔨',
        category: 'developer',
        fullName: 'AWS CodeBuild',
        description: 'CodeBuildは、ソースコードをコンパイルし、テストを実行し、デプロイ可能なソフトウェアパッケージを生成するフルマネージド型ビルドサービスです。',
        features: [
            'フルマネージドなビルド環境',
            '事前設定されたビルド環境と、カスタムDockerイメージのサポート',
            '自動スケーリング',
            'ビルドの並列実行',
            'S3、CodeCommit、GitHubなどとの統合'
        ],
        useCases: [
            '継続的インテグレーション（CI）',
            'ビルドとテストの自動化',
            'マルチプラットフォームビルド',
            'セキュリティスキャンの統合',
            'Dockerイメージのビルド'
        ],
        pricing: 'ビルドに使用したコンピューティング時間（分単位）に基づく従量課金。月間100ビルド分まで無料。',
        related: ['CodeCommit', 'CodeDeploy', 'CodePipeline', 'ECR']
    },
    'CodeDeploy': {
        icon: '🚢',
        category: 'developer',
        fullName: 'AWS CodeDeploy',
        description: 'CodeDeployは、EC2、Lambda、オンプレミスサーバーへのアプリケーションデプロイを自動化するサービスです。ダウンタイムを最小限に抑えます。',
        features: [
            'EC2、Lambda、オンプレミスへのデプロイ',
            'ローリングアップデートとBlue/Greenデプロイ',
            '自動ロールバック',
            'デプロイの一時停止と再開',
            'デプロイ設定のカスタマイズ'
        ],
        useCases: [
            'アプリケーションの自動デプロイ',
            'ダウンタイムを最小限にした更新',
            '複数環境への段階的デプロイ',
            'サーバーレスアプリケーションのデプロイ',
            'ハイブリッド環境へのデプロイ'
        ],
        pricing: 'EC2/オンプレミスへのデプロイは無料。Lambdaへのデプロイは更新あたりの課金。',
        related: ['CodeCommit', 'CodeBuild', 'CodePipeline', 'Lambda']
    }
};

// Modal functionality
const modal = document.getElementById('serviceModal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalClose = modal.querySelector('.modal-close');

// Update card click handlers to show modal
serviceCards.forEach(card => {
    const originalClickHandler = card.onclick;

    card.addEventListener('click', (e) => {
        const serviceName = card.querySelector('h3').textContent;
        const details = serviceDetails[serviceName];

        if (details) {
            showModal(details, serviceName);
        }
    });
});

// Show modal with service details
function showModal(details, serviceName) {
    const modalIcon = modal.querySelector('.modal-icon');
    const modalTitle = modal.querySelector('.modal-title');
    const modalFullName = modal.querySelector('.modal-full-name');
    const modalDescription = modal.querySelector('.modal-description');
    const modalFeatures = modal.querySelector('.modal-features');
    const modalUseCases = modal.querySelector('.modal-use-cases');
    const modalPricing = modal.querySelector('.modal-pricing');
    const modalRelated = modal.querySelector('.modal-related');
    const modalHeader = modal.querySelector('.modal-header');

    // Update content
    modalIcon.textContent = details.icon;
    modalTitle.textContent = serviceName;
    modalFullName.textContent = details.fullName;
    modalDescription.textContent = details.description;

    // Update header gradient based on category
    const categoryColors = {
        'compute': 'linear-gradient(135deg, #FF9900, #FFB84D)',
        'storage': 'linear-gradient(135deg, #3B48CC, #5865F2)',
        'database': 'linear-gradient(135deg, #C925D1, #E066E8)',
        'networking': 'linear-gradient(135deg, #1E8900, #2DB92D)',
        'security': 'linear-gradient(135deg, #DD344C, #FF5670)',
        'analytics': 'linear-gradient(135deg, #01A88D, #00D9B5)',
        'developer': 'linear-gradient(135deg, #5E6EBE, #7C8FE8)'
    };
    modalHeader.style.background = categoryColors[details.category];

    // Update features
    modalFeatures.innerHTML = '';
    details.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });

    // Update use cases
    modalUseCases.innerHTML = '';
    details.useCases.forEach(useCase => {
        const li = document.createElement('li');
        li.textContent = useCase;
        modalUseCases.appendChild(li);
    });

    // Update pricing
    modalPricing.textContent = details.pricing;

    // Update related services
    modalRelated.innerHTML = '';
    details.related.forEach(relatedService => {
        const tag = document.createElement('span');
        tag.className = 'related-tag';
        tag.textContent = relatedService;
        tag.addEventListener('click', () => {
            if (serviceDetails[relatedService]) {
                showModal(serviceDetails[relatedService], relatedService);
            }
        });
        modalRelated.appendChild(tag);
    });

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

console.log('🚀 AWS Services Visual Guide が読み込まれました！');
console.log('📊 合計サービス数:', serviceCards.length);
console.log('⌨️ キーボードショートカット: 1-8でカテゴリーを切り替え');
console.log('💾 exportServicesList() を実行してサービス一覧をエクスポート可能');
console.log('👆 カードをタップして詳細情報を表示');
