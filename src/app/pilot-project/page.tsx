import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '【期間限定】地域の安全・安心に関する地図サービス実証実験 ご協力者募集',
    description: '地域の安全・安心に役立てることを目的とした地図サービスの実証実験にご協力いただける方を募集しています。',
    robots: {
        index: false,
        follow: false,
    },
};

export default function PilotProjectPage() {
    return (
        <div style={{
            background: '#fff',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{
                fontFamily: 'sans-serif',
                lineHeight: 1.8,
                color: '#333',
                maxWidth: '800px',
                width: '100%',
                padding: '20px',
                background: '#fff'
            }}>
                <header style={{
                    textAlign: 'center',
                    marginBottom: '40px',
                    borderBottom: '1px solid #eee',
                    paddingBottom: '20px'
                }}>
                    <h1 style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        margin: '0 0 10px 0',
                        color: '#0070f3',
                        lineHeight: 1.4
                    }}>
                        【期間限定】<br />地域の安全・安心に関する地図サービス実証実験<br />ご協力者募集
                    </h1>
                </header>

                <main>
                    <section style={{ marginBottom: '30px' }}>
                        <p>
                            本件は、地域の安全・安心に役立てることを目的とした地図サービスの実証実験へのご協力依頼です。
                        </p>
                        <p>
                            内容をご確認いただき、問題なければ作業を進めていただければと思います。<br />
                            <strong style={{ background: 'linear-gradient(transparent 60%, #e3f2fd 60%)' }}>本実証実験は、サービス改善・検証を目的とした期間限定の取り組みです。</strong>
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            borderLeft: '5px solid #0070f3',
                            paddingLeft: '10px',
                            marginBottom: '20px',
                            background: '#f9f9f9',
                            padding: '10px 10px 10px 15px'
                        }}>実証実験の内容</h2>
                        <p>
                            お住まいの近所や、通勤・通学、散歩の途中などで
                            <strong style={{ color: '#d32f2f' }}>「少し不安を感じた場所」</strong>をスマートフォンで撮影し、
                            専用サイトへ投稿していただく簡単なお手伝いです。
                        </p>
                        <p>
                            投稿操作自体は、<br />
                            <strong style={{ background: 'linear-gradient(transparent 60%, #ffeb3b 60%)' }}>
                                1〜2分程度（移動時間を除く）
                            </strong>
                            で完了します。
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            borderLeft: '5px solid #0070f3',
                            paddingLeft: '10px',
                            marginBottom: '20px',
                            background: '#f9f9f9',
                            padding: '10px 10px 10px 15px'
                        }}>作業手順</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {/* Step 1 */}
                            <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#0070f3' }}>【① サイトへアクセス】</h3>
                                <p style={{ margin: 0 }}>
                                    スマートフォンのブラウザで、以下のURLにアクセスしてください。<br />
                                    <a href="https://machi-repo.jp/" target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', fontWeight: 'bold' }}>
                                        https://machi-repo.jp/
                                    </a>
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#0070f3' }}>【② ログイン】</h3>
                                <p style={{ marginBottom: '10px' }}>
                                    ページ右上の「ログイン」をタップし、以下いずれかの方法でログインしてください。
                                </p>
                                <ul style={{ background: '#f5f5f5', padding: '10px 30px', borderRadius: '4px' }}>
                                    <li>メールアドレス</li>
                                    <li>Googleログイン</li>
                                </ul>
                                <p style={{ marginTop: '10px', fontSize: '14px', color: '#d32f2f', fontWeight: 'bold' }}>
                                    ※ スマートフォンの位置情報の機能を「有効」にした状態でお願いします。
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#0070f3' }}>【③ 現在地を表示】</h3>
                                <p style={{ margin: 0 }}>
                                    地図画面の右下にある<br />
                                    <strong>「方位磁針のようなアイコン」</strong>をタップすると、現在地に地図が移動します。
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#0070f3' }}>【④ 投稿を開始】</h3>
                                <p style={{ margin: 0 }}>
                                    現在地表示の下にある<br />
                                    <strong>「ピンク色のアイコン」</strong>をタップすると、投稿画面が開きます。
                                </p>
                            </div>

                            {/* Step 5 */}
                            <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#0070f3' }}>【⑤ 投稿内容の入力】</h3>
                                <p style={{ marginBottom: '10px' }}>以下の内容を入力してください。</p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.6' }}>
                                    <li>不安カテゴリー（4種類の中から1つ選択）</li>
                                    <li>詳細タグ（該当するものを1つ以上選択）</li>
                                    <li>時間帯（任意）</li>
                                    <li><strong>写真を1枚アップロード</strong></li>
                                </ul>
                                <p style={{ marginTop: '10px' }}>
                                    入力後、「投稿する」ボタンを押して完了です。
                                </p>
                            </div>
                        </div>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            borderLeft: '5px solid #0070f3',
                            paddingLeft: '10px',
                            marginBottom: '20px',
                            background: '#f9f9f9',
                            padding: '10px 10px 10px 15px'
                        }}>投稿件数・報酬について</h2>
                        <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>写真付き投稿をお願いします</p>

                        <div style={{
                            background: '#fff3e0',
                            border: '2px solid #ffeeda',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center',
                            marginBottom: '15px'
                        }}>
                            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#e65100', margin: '0 0 10px 0' }}>
                                1件：100円
                            </p>
                            <p style={{ fontSize: '14px', margin: 0 }}>
                                1人あたり最大5件まで（1件から参加可能です）
                            </p>
                        </div>

                        <p>
                            異なるエリアであれば、複数件投稿していただいても問題ありません。<br />
                            （例：4件投稿の場合、400円）
                        </p>
                        <p style={{ fontSize: '13px', color: '#666', marginTop: '10px' }}>
                            ※ 同じ場所や、極端に近い場所での連続投稿はご遠慮ください。
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            borderLeft: '5px solid #d32f2f',
                            paddingLeft: '10px',
                            marginBottom: '20px',
                            background: '#fff5f5',
                            padding: '10px 10px 10px 15px',
                            color: '#d32f2f'
                        }}>お支払い・報告方法について</h2>
                        <p>
                            投稿内容の確認後、<strong style={{ color: '#d32f2f' }}>PayPay（個人間送金）</strong>にてお支払いします。
                        </p>
                        <p>作業完了後、以下の2点をメッセージでお知らせください。</p>

                        <div style={{
                            background: '#fafafa',
                            border: '1px dashed #999',
                            padding: '20px',
                            borderRadius: '8px',
                            margin: '20px 0'
                        }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        background: '#333', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', marginRight: '10px'
                                    }}>1</span>
                                    <span>ログイン後、「マイページ」に表示されている<strong>【6桁のID】</strong></span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        background: '#333', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', marginRight: '10px'
                                    }}>2</span>
                                    <span>PayPayの<strong>【送金用URL】</strong></span>
                                </li>
                            </ul>
                        </div>
                        <p style={{ fontSize: '14px' }}>
                            ※ 3件投稿した時点で一度ご報告いただいても構いません。
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            borderLeft: '5px solid #666',
                            paddingLeft: '10px',
                            marginBottom: '20px',
                            background: '#f9f9f9',
                            padding: '10px 10px 10px 15px'
                        }}>注意事項（必ずご確認ください）</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '8px' }}>個人や住宅、車のナンバー等が特定される写真は撮影しないでください</li>
                            <li style={{ marginBottom: '8px' }}>夜間など、無理な撮影は行わないでください</li>
                            <li style={{ marginBottom: '8px' }}>危険な行為は行わないようお願いします</li>
                            <li style={{ marginBottom: '8px' }}>投稿された写真は、投稿者ご本人と運営のみが確認します。<br />一般公開はされませんのでご安心ください。</li>
                            <li>また、写真の位置情報（カメラの設定）が有効になっているか、事前にご確認をお願いします。</li>
                        </ul>
                    </section>

                    <section style={{
                        marginBottom: '40px',
                        textAlign: 'center',
                        background: '#eee',
                        padding: '20px',
                        borderRadius: '8px'
                    }}>
                        <h2 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>実施期間について</h2>
                        <p style={{ margin: 0 }}>
                            本実証実験は、予告なく終了する場合があります。<br />
                            参加をご希望の方は、お早めにご協力ください。
                        </p>
                    </section>

                    <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '40px' }}>
                        <p style={{ marginBottom: '20px' }}>
                            ご不明点があれば、お気軽にご連絡ください。<br />
                            よろしくお願いいたします。
                        </p>
                        <a href="/" style={{
                            display: 'inline-block',
                            background: '#0070f3',
                            color: '#fff',
                            textDecoration: 'none',
                            padding: '15px 40px',
                            borderRadius: '30px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 10px rgba(0,112,243,0.3)'
                        }}>
                            実証実験に参加する（マップへ）
                        </a>
                    </div>
                </main>
            </div>
        </div>
    );
}
