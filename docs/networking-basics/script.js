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

    console.log(`表示中のトピック数: ${count}`);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '7') {
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
    searchInput.placeholder = 'トピックを検索...';
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
        searchInput.style.borderColor = '#4A90D9';
        searchInput.style.boxShadow = '0 0 0 3px rgba(74, 144, 217, 0.1)';
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

    console.log('カテゴリー別トピック数:', categories);
    return categories;
}

// Display stats on load
showCategoryStats();

// Add export functionality (for learning purposes)
function exportTopicsList() {
    const topics = [];

    serviceCards.forEach(card => {
        const topic = {
            name: card.querySelector('h3').textContent,
            fullName: card.querySelector('h4').textContent,
            description: card.querySelector('.card-body p').textContent,
            category: card.dataset.category,
            tags: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent)
        };
        topics.push(topic);
    });

    return topics;
}

// Make export function available globally
window.exportTopicsList = exportTopicsList;

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

// Detailed topic information database
const topicDetails = {
    'OSI参照モデル': {
        icon: '📚',
        category: 'basics',
        fullName: 'Open Systems Interconnection Reference Model',
        description: 'OSI参照モデルは、国際標準化機構（ISO）が策定したネットワーク通信の概念モデルです。通信機能を7つの階層に分けることで、異なるベンダーのシステム間でも相互接続を可能にしています。',
        features: [
            '第7層（アプリケーション層）: ユーザーが直接利用するサービス（HTTP、FTP、SMTPなど）',
            '第6層（プレゼンテーション層）: データ形式の変換、暗号化、圧縮',
            '第5層（セッション層）: 通信セッションの確立、管理、終了',
            '第4層（トランスポート層）: エンドツーエンドの信頼性の高い通信（TCP、UDP）',
            '第3層（ネットワーク層）: 論理アドレス指定とルーティング（IP）',
            '第2層（データリンク層）: 物理アドレス指定とフレーム化（Ethernet、MAC）',
            '第1層（物理層）: 電気信号、光信号、ケーブル規格'
        ],
        useCases: [
            'ネットワーク問題のトラブルシューティング',
            'ネットワーク機器の機能分類',
            'プロトコル設計の基礎理解',
            'ベンダー間の相互運用性の確保',
            'ネットワーク教育のフレームワーク'
        ],
        tips: '実務では「OSIの7層」を覚えておくと、問題が発生した際にどの層で起きているかを特定しやすくなります。覚え方: 「アプセトネデブ」（アプリケーション、プレゼンテーション、セッション、トランスポート、ネットワーク、データリンク、物理）',
        related: ['TCP/IPモデル', 'パケット通信', 'TCP', 'ルーター']
    },
    'TCP/IPモデル': {
        icon: '🔗',
        category: 'basics',
        fullName: 'Transmission Control Protocol/Internet Protocol Model',
        description: 'TCP/IPモデルは、インターネットで実際に使用されているプロトコルスタックです。OSI参照モデルより実用的な4層構造で、現代のネットワーク通信の基盤となっています。',
        features: [
            '第4層（アプリケーション層）: HTTP、FTP、SMTP、DNSなどのプロトコル',
            '第3層（トランスポート層）: TCPとUDPによるエンドツーエンド通信',
            '第2層（インターネット層）: IPによるルーティングとアドレッシング',
            '第1層（ネットワークインターフェース層）: 物理的な通信を担当',
            'OSI参照モデルより実用的で広く使用されている'
        ],
        useCases: [
            'インターネット通信の基盤',
            'Webブラウジング',
            'メール送受信',
            'ファイル転送',
            'すべてのインターネットアプリケーション'
        ],
        tips: 'TCP/IPは「インターネットの共通言語」です。OSI参照モデルが概念モデルであるのに対し、TCP/IPは実際に動作する実装モデルです。',
        related: ['OSI参照モデル', 'TCP', 'UDP', 'IPv4']
    },
    'パケット通信': {
        icon: '📡',
        category: 'basics',
        fullName: 'Packet Switching Communication',
        description: 'パケット通信は、データを小さな単位（パケット）に分割して送信する通信方式です。各パケットは独立してネットワークを通過し、宛先で再構成されます。',
        features: [
            'データを小さなパケットに分割して送信',
            '各パケットにヘッダー情報（送信元、宛先、順序など）を付与',
            '複数の経路を通って宛先に到達可能',
            '回線の効率的な利用が可能',
            'パケットロス時の再送機能'
        ],
        useCases: [
            'インターネット通信全般',
            'VoIP（IP電話）',
            'ビデオストリーミング',
            'オンラインゲーム',
            'IoTデバイスの通信'
        ],
        tips: '回線交換（電話のような専用回線）と比較して、パケット交換は回線を効率的に共有できます。ただし、リアルタイム性が求められる通信では遅延が問題になることがあります。',
        related: ['TCP', 'UDP', 'ルーター', 'IPv4']
    },
    'TCP': {
        icon: '🔄',
        category: 'protocol',
        fullName: 'Transmission Control Protocol',
        description: 'TCPは、信頼性の高いコネクション型プロトコルです。3ウェイハンドシェイクで接続を確立し、データの到着順序と完全性を保証します。',
        features: [
            '3ウェイハンドシェイク（SYN → SYN-ACK → ACK）による接続確立',
            'シーケンス番号によるパケット順序の保証',
            '確認応答（ACK）による到達確認',
            'フロー制御とウィンドウサイズ調整',
            '輻輳制御による効率的なデータ転送'
        ],
        useCases: [
            'Webブラウジング（HTTP/HTTPS）',
            'メール送受信（SMTP、POP、IMAP）',
            'ファイル転送（FTP）',
            'SSH接続',
            'データベース接続'
        ],
        tips: 'TCPは「確実に届ける」ことを重視します。信頼性が必要な通信（Webページ、メール、ファイル転送）に使用されます。ポート番号で通信を識別します。',
        related: ['UDP', 'HTTP/HTTPS', 'TCP/IPモデル', 'パケット通信']
    },
    'UDP': {
        icon: '⚡',
        category: 'protocol',
        fullName: 'User Datagram Protocol',
        description: 'UDPは、高速なコネクションレス型プロトコルです。接続確立のオーバーヘッドがなく、リアルタイム通信やストリーミングに最適です。',
        features: [
            'コネクションレスで高速な通信',
            'ヘッダーサイズが小さい（8バイト）',
            '到達確認や再送制御がない',
            'ブロードキャスト/マルチキャスト対応',
            '低レイテンシーが求められる通信に最適'
        ],
        useCases: [
            'DNS名前解決',
            'VoIP（IP電話）',
            'ビデオストリーミング',
            'オンラインゲーム',
            'NTPによる時刻同期'
        ],
        tips: 'UDPは「速さ優先」です。多少のパケットロスが許容される、リアルタイム性が重要な通信に使用されます。信頼性が必要な場合はアプリケーション層で対応します。',
        related: ['TCP', 'DNS', 'TCP/IPモデル', 'パケット通信']
    },
    'HTTP/HTTPS': {
        icon: '🌍',
        category: 'protocol',
        fullName: 'HyperText Transfer Protocol (Secure)',
        description: 'HTTPはWebページの転送に使用されるプロトコルです。HTTPSはSSL/TLSによる暗号化を追加し、安全な通信を実現します。',
        features: [
            'リクエスト/レスポンス型の通信',
            'ステートレスなプロトコル（各リクエストは独立）',
            'HTTPメソッド: GET、POST、PUT、DELETE、PATCHなど',
            'HTTPSは通信内容を暗号化',
            'HTTP/2、HTTP/3による高速化'
        ],
        useCases: [
            'Webブラウジング',
            'REST API通信',
            'Webアプリケーション',
            'CDNからのコンテンツ配信',
            'IoTデバイスのAPI通信'
        ],
        tips: '現在はHTTPSが標準です。HTTPSを使用していないサイトはブラウザで警告が表示されます。HTTPはポート80、HTTPSはポート443を使用します。',
        related: ['TCP', 'SSL/TLS', 'DNS', 'プロキシ']
    },
    'SMTP/POP/IMAP': {
        icon: '📧',
        category: 'protocol',
        fullName: 'メールプロトコル群',
        description: '電子メールの送受信に使用されるプロトコル群です。SMTPは送信、POPとIMAPは受信に使用され、それぞれ異なる特徴を持ちます。',
        features: [
            'SMTP（ポート25/587）: メール送信プロトコル',
            'POP3（ポート110）: メールをダウンロードして削除',
            'IMAP（ポート143）: サーバー上でメールを管理',
            'SSL/TLS暗号化版も存在（SMTPS、POP3S、IMAPS）',
            'メールヘッダーによる経路情報の記録'
        ],
        useCases: [
            '企業メールシステム',
            'Webメールサービス',
            'メーリングリスト配信',
            '自動通知システム',
            'マーケティングメール配信'
        ],
        tips: 'IMAPは複数デバイスでメールを同期する場合に便利です。POPは端末にダウンロードして管理する場合に使用します。SMTPは送信専用のプロトコルです。',
        related: ['TCP', 'DNS', 'SSL/TLS', 'ファイアウォール']
    },
    'IPv4': {
        icon: '🔢',
        category: 'addressing',
        fullName: 'Internet Protocol version 4',
        description: 'IPv4は、32ビットのIPアドレスを使用する現行のインターネットプロトコルです。約43億個のアドレスを提供しますが、枯渇が問題となっています。',
        features: [
            '32ビット（4バイト）のアドレス空間',
            'ドット区切りの10進表記（例: 192.168.1.1）',
            'プライベートアドレスとグローバルアドレスの区別',
            'クラスA/B/C/D/Eによる分類',
            'CIDRによる柔軟なアドレス割り当て'
        ],
        useCases: [
            '現在のインターネット通信の主流',
            'LANネットワークの構築',
            'VPN接続',
            'サーバー間通信',
            'IoTデバイスのネットワーク'
        ],
        tips: 'プライベートIPアドレスの範囲を覚えておきましょう: 10.0.0.0/8、172.16.0.0/12、192.168.0.0/16。これらはインターネット上でルーティングされません。',
        related: ['IPv6', 'サブネット', 'NAT', 'DHCP']
    },
    'IPv6': {
        icon: '🔠',
        category: 'addressing',
        fullName: 'Internet Protocol version 6',
        description: 'IPv6は、128ビットのIPアドレスを使用する次世代インターネットプロトコルです。事実上無限のアドレス空間を提供し、IPv4の枯渇問題を解決します。',
        features: [
            '128ビット（16バイト）の広大なアドレス空間',
            'コロン区切りの16進表記（例: 2001:0db8::1）',
            '自動アドレス設定（SLAAC）機能',
            'NATが不要な設計',
            'セキュリティ機能（IPsec）の標準搭載'
        ],
        useCases: [
            'モバイルネットワーク（LTE/5G）',
            'IoTデバイスの大規模展開',
            'クラウドサービス',
            'データセンターネットワーク',
            '次世代インターネットインフラ'
        ],
        tips: 'IPv6アドレスは長いですが、連続するゼロは「::」で省略できます。IPv4との共存期間が続いており、デュアルスタック構成が一般的です。',
        related: ['IPv4', 'サブネット', 'DNS', 'ルーター']
    },
    'サブネット': {
        icon: '🎭',
        category: 'addressing',
        fullName: 'Subnet / CIDR (Classless Inter-Domain Routing)',
        description: 'サブネットは、大きなネットワークを小さなネットワークに分割する技術です。CIDR表記（/24など）を使用して、効率的なIPアドレス管理を実現します。',
        features: [
            'ネットワーク部とホスト部の柔軟な分割',
            'CIDR表記（例: 192.168.1.0/24）による表現',
            'サブネットマスクによるネットワーク範囲の指定',
            'ブロードキャストドメインの分割',
            'セキュリティ向上とトラフィック制御'
        ],
        useCases: [
            '企業ネットワークの部門分割',
            'VLANと組み合わせた論理分割',
            'クラウドVPCのネットワーク設計',
            'IPアドレスの効率的な利用',
            'ルーティングテーブルの最適化'
        ],
        tips: 'よく使われるサブネット: /24（256アドレス、254ホスト）、/16（65,536アドレス）、/8（約1677万アドレス）。ネットワークアドレスとブロードキャストアドレスは使用不可です。',
        related: ['IPv4', 'IPv6', 'ルーター', 'DHCP']
    },
    'MACアドレス': {
        icon: '🏠',
        category: 'addressing',
        fullName: 'Media Access Control Address',
        description: 'MACアドレスは、ネットワーク機器のネットワークインターフェースに割り当てられた48ビットの一意の識別子です。データリンク層（L2）で使用されます。',
        features: [
            '48ビット（6バイト）の固定長アドレス',
            'コロンまたはハイフン区切りの16進表記（例: 00:1A:2B:3C:4D:5E）',
            '前半24ビットがベンダー識別子（OUI）',
            '後半24ビットがデバイス固有番号',
            '通常は製造時に書き込まれる（変更可能）'
        ],
        useCases: [
            'ローカルネットワーク内のデバイス識別',
            'MACアドレスフィルタリング',
            'ARPによるIPからMACへの解決',
            'スイッチのMACアドレステーブル',
            'Wake-on-LAN機能'
        ],
        tips: 'IPアドレスが「住所」なら、MACアドレスは「名前」です。ARPプロトコルがIPアドレスとMACアドレスを紐づけます。ブロードキャストMACは FF:FF:FF:FF:FF:FF です。',
        related: ['IPv4', 'スイッチ', 'ARP', 'DHCP']
    },
    'ルーター': {
        icon: '🔀',
        category: 'device',
        fullName: 'Router',
        description: 'ルーターは、異なるネットワーク間でパケットを転送するL3（ネットワーク層）デバイスです。ルーティングテーブルを使用して最適な経路を選択します。',
        features: [
            'IPアドレスに基づくパケット転送',
            'ルーティングテーブルによる経路管理',
            '静的ルーティングと動的ルーティング（RIP、OSPF、BGP）',
            'NATによるアドレス変換機能',
            'アクセス制御リスト（ACL）によるフィルタリング'
        ],
        useCases: [
            'インターネット接続',
            '拠点間WAN接続',
            'ネットワークセグメンテーション',
            'VPNゲートウェイ',
            'トラフィック制御とQoS'
        ],
        tips: 'ルーターはブロードキャストを通過させません（ブロードキャストドメインを分割）。デフォルトゲートウェイは、宛先不明のパケットを転送する先のルーターです。',
        related: ['スイッチ', 'IPv4', 'NAT', 'ファイアウォール']
    },
    'スイッチ': {
        icon: '🔌',
        category: 'device',
        fullName: 'Network Switch',
        description: 'スイッチは、同一ネットワーク内でフレームを転送するL2（データリンク層）デバイスです。MACアドレステーブルを学習して効率的に通信を行います。',
        features: [
            'MACアドレスに基づくフレーム転送',
            'MACアドレステーブルの自動学習',
            'コリジョンドメインの分割',
            'VLAN機能による論理的なネットワーク分割',
            'L3スイッチはルーティング機能も搭載'
        ],
        useCases: [
            'オフィスLANの構築',
            'サーバールームの接続',
            'VLAN間通信',
            '高速なローカルネットワーク',
            'PoE（Power over Ethernet）給電'
        ],
        tips: 'スイッチとハブの違い: ハブは全ポートにデータを送信しますが、スイッチは宛先MACアドレスのポートにのみ送信します。これにより帯域幅を効率的に使用できます。',
        related: ['ルーター', 'MACアドレス', 'アクセスポイント', 'VLAN']
    },
    'アクセスポイント': {
        icon: '📶',
        category: 'device',
        fullName: 'Wireless Access Point (WAP)',
        description: 'アクセスポイントは、無線LANの基地局として機能するデバイスです。有線ネットワークと無線デバイス（スマートフォン、ノートPCなど）を接続します。',
        features: [
            'IEEE 802.11規格（Wi-Fi）に準拠',
            '2.4GHzと5GHz帯域の使用',
            'WPA2/WPA3によるセキュリティ',
            'SSIDによるネットワーク識別',
            'ローミング機能による seamless な移動'
        ],
        useCases: [
            'オフィスの無線LAN環境構築',
            '公衆Wi-Fiスポット',
            '家庭内ネットワーク',
            'IoTデバイスの接続',
            'ゲストネットワークの提供'
        ],
        tips: 'Wi-Fi規格: 802.11n（Wi-Fi 4）、802.11ac（Wi-Fi 5）、802.11ax（Wi-Fi 6/6E）。チャンネル干渉を避けるため、2.4GHzではチャンネル1、6、11が推奨されます。',
        related: ['スイッチ', 'ルーター', 'SSL/TLS', 'ファイアウォール']
    },
    'ロードバランサー': {
        icon: '⚖️',
        category: 'device',
        fullName: 'Load Balancer',
        description: 'ロードバランサーは、複数のサーバーにトラフィックを分散させるデバイス/ソフトウェアです。高可用性、スケーラビリティ、パフォーマンス向上を実現します。',
        features: [
            '複数の負荷分散アルゴリズム（ラウンドロビン、最小接続数、IPハッシュなど）',
            'ヘルスチェックによるサーバー監視',
            'SSLオフロード機能',
            'L4（トランスポート層）とL7（アプリケーション層）の負荷分散',
            'セッション維持（スティッキーセッション）'
        ],
        useCases: [
            'Webサービスの高可用性確保',
            'APIゲートウェイ',
            'マイクロサービスの負荷分散',
            'データベースの読み取り分散',
            'CDNのオリジンサーバー'
        ],
        tips: 'L4ロードバランサーはTCP/UDPレベルで高速に分散。L7ロードバランサーはHTTPヘッダーやURLパスに基づく高度なルーティングが可能です。',
        related: ['ルーター', 'プロキシ', 'HTTP/HTTPS', 'DNS']
    },
    'DNS': {
        icon: '📖',
        category: 'service',
        fullName: 'Domain Name System',
        description: 'DNSは、ドメイン名をIPアドレスに変換する分散データベースシステムです。インターネットの「電話帳」として、人間が覚えやすい名前でアクセスを可能にします。',
        features: [
            '階層的な分散データベース構造',
            'キャッシュによる高速な名前解決',
            '複数のレコードタイプ（A、AAAA、CNAME、MX、TXT、NSなど）',
            '再帰的クエリと反復クエリ',
            'DNSSEC によるセキュリティ拡張'
        ],
        useCases: [
            'WebサイトへのURL アクセス',
            'メールサーバーの特定（MXレコード）',
            'CDNによる地理的分散',
            'サービス検出',
            'ドメイン所有権の検証（TXTレコード）'
        ],
        tips: 'DNSの階層: ルート → TLD（.com, .jp） → ドメイン → サブドメイン。よく使うDNSサーバー: 8.8.8.8（Google）、1.1.1.1（Cloudflare）。nslookupやdigコマンドで確認できます。',
        related: ['IPv4', 'IPv6', 'HTTP/HTTPS', 'ルーター']
    },
    'DHCP': {
        icon: '🎫',
        category: 'service',
        fullName: 'Dynamic Host Configuration Protocol',
        description: 'DHCPは、ネットワーク設定を自動的に割り当てるプロトコルです。IPアドレス、サブネットマスク、デフォルトゲートウェイ、DNSサーバーなどを配布します。',
        features: [
            'IPアドレスの自動割り当て',
            'リース期間による一時的な割り当て',
            'DORA プロセス（Discover→Offer→Request→Acknowledge）',
            'アドレスプールの管理',
            '予約アドレスの設定（MACアドレスと紐づけ）'
        ],
        useCases: [
            'オフィスネットワークのPC設定自動化',
            '公衆Wi-Fiのアドレス配布',
            'ホームルーターの接続設定',
            'IoTデバイスの大量導入',
            'ゲストネットワークの管理'
        ],
        tips: 'DHCPサーバーが見つからない場合、Windowsは169.254.x.x（APIPA）を自動設定します。固定IPが必要なサーバーにはDHCP予約を使用しましょう。',
        related: ['IPv4', 'サブネット', 'ルーター', 'DNS']
    },
    'NAT': {
        icon: '🔄',
        category: 'service',
        fullName: 'Network Address Translation',
        description: 'NATは、プライベートIPアドレスをグローバルIPアドレスに変換する技術です。IPv4アドレスの節約とセキュリティ向上に貢献します。',
        features: [
            '静的NAT: 1対1の固定変換',
            '動的NAT: 多対多の動的変換',
            'NAPT（PAT）: ポート番号を使用した多対1変換',
            '内部ネットワークの隠蔽',
            'IPv4アドレス節約への貢献'
        ],
        useCases: [
            'ホームルーターのインターネット接続',
            '企業ネットワークの外部接続',
            'クラウドVPCのインターネットゲートウェイ',
            'ロードバランサーのVIP',
            'VPN接続時のアドレス変換'
        ],
        tips: 'NATの内側からは外部に接続できますが、外部から内側への接続は通常できません（ポートフォワーディングで対応）。これがセキュリティ上のメリットでもあります。',
        related: ['IPv4', 'ルーター', 'ファイアウォール', 'VPN']
    },
    'プロキシ': {
        icon: '🖥️',
        category: 'service',
        fullName: 'Proxy Server',
        description: 'プロキシサーバーは、クライアントとサーバーの間に立つ中継サーバーです。キャッシュ、コンテンツフィルタリング、匿名化、アクセス制御などの機能を提供します。',
        features: [
            'フォワードプロキシ: クライアント側に配置',
            'リバースプロキシ: サーバー側に配置',
            'キャッシュによる応答高速化',
            'コンテンツフィルタリング',
            'アクセスログの記録'
        ],
        useCases: [
            '企業のWebアクセス制御',
            'Webサイトの負荷軽減（リバースプロキシ）',
            'CDNエッジサーバー',
            'APIゲートウェイ',
            'セキュリティ検査（WAF）'
        ],
        tips: 'リバースプロキシ（Nginx、HAProxyなど）はWebサーバーの前段に配置し、SSL終端、負荷分散、キャッシュなどを担当します。',
        related: ['HTTP/HTTPS', 'ロードバランサー', 'ファイアウォール', 'DNS']
    },
    'ファイアウォール': {
        icon: '🛡️',
        category: 'security',
        fullName: 'Firewall',
        description: 'ファイアウォールは、ネットワークトラフィックを監視・制御するセキュリティシステムです。許可されていない通信をブロックし、ネットワークを不正アクセスから保護します。',
        features: [
            'パケットフィルタリング（L3/L4）',
            'ステートフルインスペクション',
            'アプリケーション層ゲートウェイ（L7）',
            '次世代ファイアウォール（NGFW）',
            'ゾーンベースのポリシー管理'
        ],
        useCases: [
            '企業ネットワークの境界防御',
            'クラウドセキュリティグループ',
            'ホスト型ファイアウォール（Windows/Linux）',
            'DMZの構築',
            'マイクロセグメンテーション'
        ],
        tips: 'ファイアウォールの基本は「デフォルト拒否」です。必要な通信のみを明示的に許可しましょう。インバウンドとアウトバウンドの両方を考慮することが重要です。',
        related: ['NAT', 'VPN', 'IDS/IPS', 'プロキシ']
    },
    'VPN': {
        icon: '🔒',
        category: 'security',
        fullName: 'Virtual Private Network',
        description: 'VPNは、暗号化されたトンネルを通じて安全な通信を実現する技術です。リモートアクセスや拠点間接続に使用され、インターネット上でプライベートネットワークを構築します。',
        features: [
            'IPsec VPN: L3レベルの暗号化',
            'SSL/TLS VPN: アプリケーション層の暗号化',
            'サイト間VPN: 拠点間の常時接続',
            'リモートアクセスVPN: 外出先からの接続',
            'スプリットトンネリングオプション'
        ],
        useCases: [
            'リモートワークでの社内システム接続',
            '複数拠点間のセキュアな接続',
            'クラウドとオンプレミスの接続',
            'パブリックWi-Fiでの安全な通信',
            '地理的制限の回避'
        ],
        tips: 'IPsec VPNはネットワーク層で動作し高速ですが設定が複雑。SSL VPNはブラウザベースで導入が簡単です。WireGuardは新しい軽量プロトコルとして注目されています。',
        related: ['SSL/TLS', 'ファイアウォール', 'NAT', 'ルーター']
    },
    'SSL/TLS': {
        icon: '🔐',
        category: 'security',
        fullName: 'Secure Sockets Layer / Transport Layer Security',
        description: 'SSL/TLSは、通信を暗号化するプロトコルです。HTTPS、メール、VPNなど、様々なアプリケーションで安全な通信を実現するために広く使用されています。',
        features: [
            '公開鍵暗号方式による鍵交換',
            '共通鍵暗号方式によるデータ暗号化',
            'デジタル証明書による認証',
            'データ完全性の検証（MAC）',
            'TLS 1.3による高速化とセキュリティ強化'
        ],
        useCases: [
            'HTTPS Webサイト',
            'メールの暗号化（SMTPS、IMAPS）',
            'VPN接続',
            'オンラインバンキング',
            'ECサイトの決済'
        ],
        tips: 'SSL 3.0以前は脆弱性があるため使用禁止。TLS 1.2以上を使用しましょう。Let\'s Encryptで無料のSSL証明書が取得できます。',
        related: ['HTTP/HTTPS', 'VPN', 'ファイアウォール', 'TCP']
    },
    'IDS/IPS': {
        icon: '🕵️',
        category: 'security',
        fullName: 'Intrusion Detection/Prevention System',
        description: 'IDS/IPSは、ネットワーク上の不正活動を検知・防止するシステムです。シグネチャベースと異常検知ベースの両方のアプローチでサイバー攻撃から保護します。',
        features: [
            'IDS: 検知と警告（パッシブ）',
            'IPS: 検知と遮断（アクティブ）',
            'シグネチャベース検知: 既知の攻撃パターン',
            '異常検知: 通常と異なる振る舞い',
            'ネットワーク型（NIDS/NIPS）とホスト型（HIDS/HIPS）'
        ],
        useCases: [
            '企業ネットワークの監視',
            'クラウド環境のセキュリティ',
            'PCI DSS等のコンプライアンス対応',
            'マルウェア通信の検知',
            'DDoS攻撃の軽減'
        ],
        tips: 'IDSは「監視カメラ」、IPSは「警備員」のようなものです。誤検知（False Positive）と見逃し（False Negative）のバランス調整が重要です。',
        related: ['ファイアウォール', 'VPN', 'プロキシ', 'ログ監視']
    }
};

// Modal functionality
const modal = document.getElementById('serviceModal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalClose = modal.querySelector('.modal-close');

// Update card click handlers to show modal
serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const topicName = card.querySelector('h3').textContent;
        const details = topicDetails[topicName];

        if (details) {
            showModal(details, topicName);
        }
    });
});

// Show modal with topic details
function showModal(details, topicName) {
    const modalIcon = modal.querySelector('.modal-icon');
    const modalTitle = modal.querySelector('.modal-title');
    const modalFullName = modal.querySelector('.modal-full-name');
    const modalDescription = modal.querySelector('.modal-description');
    const modalFeatures = modal.querySelector('.modal-features');
    const modalUseCases = modal.querySelector('.modal-use-cases');
    const modalTips = modal.querySelector('.modal-tips');
    const modalRelated = modal.querySelector('.modal-related');
    const modalHeader = modal.querySelector('.modal-header');

    // Update content
    modalIcon.textContent = details.icon;
    modalTitle.textContent = topicName;
    modalFullName.textContent = details.fullName;
    modalDescription.textContent = details.description;

    // Update header gradient based on category
    const categoryColors = {
        'basics': 'linear-gradient(135deg, #4A90D9, #6BA3E0)',
        'protocol': 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
        'addressing': 'linear-gradient(135deg, #9B59B6, #B07CC6)',
        'device': 'linear-gradient(135deg, #2ECC71, #58D68D)',
        'service': 'linear-gradient(135deg, #F39C12, #F5B041)',
        'security': 'linear-gradient(135deg, #E74C3C, #EC7063)'
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

    // Update tips
    modalTips.textContent = details.tips;

    // Update related topics
    modalRelated.innerHTML = '';
    details.related.forEach(relatedTopic => {
        const tag = document.createElement('span');
        tag.className = 'related-tag';
        tag.textContent = relatedTopic;
        tag.addEventListener('click', () => {
            if (topicDetails[relatedTopic]) {
                showModal(topicDetails[relatedTopic], relatedTopic);
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

console.log('🌐 ネットワーク基礎知識 ビジュアルガイド が読み込まれました！');
console.log('📊 合計トピック数:', serviceCards.length);
console.log('⌨️ キーボードショートカット: 1-7でカテゴリーを切り替え');
console.log('💾 exportTopicsList() を実行してトピック一覧をエクスポート可能');
console.log('👆 カードをタップして詳細情報を表示');
