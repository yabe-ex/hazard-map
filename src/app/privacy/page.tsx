import React from 'react';
import StaticPageHeader from '@/components/StaticPageHeader';

export const metadata = {
    title: 'プライバシーポリシー - みんなのマチレポ',
    description: 'みんなのマチレポのプライバシーポリシーです。個人情報、位置情報、利用者情報の取り扱いについて定めています。'
};

export default function PrivacyPage() {
    return (
        <main style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.8', background: '#f9f9f9', minHeight: '100vh' }}>
            <StaticPageHeader />

            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px 60px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>
                    プライバシーポリシー
                </h1>

                <p style={{ marginBottom: '20px' }}>
                    「みんなのマチレポ」（以下，「本サービス」といいます。）における、ユーザーの個人情報および利用者情報の取り扱いについて、以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
                </p>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第1条（収集する情報と公開範囲）</h2>
                    <p>本サービスでは、以下の情報を取得しますが、情報の種類によって公開範囲が異なります。</p>

                    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '15px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#0070f3' }}>
                            1. 地図上で「一般公開」される情報
                        </h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                            <li>
                                <strong>位置情報（GPS）</strong>：投稿された場所の緯度・経度。
                            </li>
                            <li>
                                <strong>不安の理由</strong>：選択肢から選ばれた内容（「暗い」「見通しが悪い」など）。
                            </li>
                            <li>
                                <strong>投稿日時</strong>
                            </li>
                        </ul>
                        <p style={{ fontSize: '13px', color: '#666' }}>※ユーザーが自由に文章を入力する機能はありません。</p>

                        <div style={{ borderTop: '1px solid #eee', margin: '15px 0' }}></div>

                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#d32f2f' }}>2. 一般には「非公開」の情報</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                            <li>
                                <strong>投稿画像（写真）</strong>：ユーザーが任意で撮影・送信した現場写真。
                            </li>
                            <li>
                                <strong>メールアドレス・アカウント情報</strong>：ログイン時のみ取得します。
                            </li>
                        </ul>
                        <p style={{ marginTop: '10px' }}>
                            投稿された写真は、運営者および本サービスと提携する地域の安全管理を行う団体（以下「提携先」）のみが閲覧でき、一般ユーザーには公開されません。
                            <br />
                            また、メールアドレス等の連絡先情報が提携先に開示されることはありません。
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第2条（ログインと利用履歴）</h2>
                    <p>本サービスは、ログインなしでも利用可能ですが、ログインすることで以下の機能が利用できます。</p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                        <li>
                            <strong>認証方法</strong>：メールアドレスまたはGoogleアカウントを選択してログインできます。
                        </li>
                        <li>
                            <strong>ログインのメリット</strong>：過去に自分が投稿した履歴を確認したり、投稿を削除したりすることが可能になります。
                        </li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第3条（利用目的）</h2>
                    <p>運営者が収集した情報は、以下の目的で利用します。</p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                        <li>本サービスの提供・運営のため</li>
                        <li>地域の安全対策・環境改善のための提携先への情報提供</li>
                        <li>本サービスの利用状況分析、機能改善のため</li>
                        <li>不正・不当な目的での利用への対応のため</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第4条（第三者提供）</h2>
                    <p>
                        運営者は、あらかじめユーザーの同意を得ることなく、第三者に個人情報（メールアドレス等）を提供することはありません。
                        ただし、本サービスの目的である「地域の安全向上」のため、
                        投稿された情報（位置情報、不安理由、写真）に限り、その地域を管轄する提携先に対して提供する場合があります。
                        この場合においても、ユーザーの連絡先（メールアドレス等）が提供されることはありません。
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第5条（アクセス解析ツールについて）</h2>
                    <p>
                        本サービスでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しており、トラフィックデータの収集のためにCookieを使用しています。
                        このデータは匿名で収集されており、個人を特定するものではありません。
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第6条（お問い合わせ窓口）</h2>
                    <p>本ポリシーに関するお問い合わせは、以下のお問い合わせフォームよりお願いいたします。</p>
                    <div style={{ marginTop: '10px' }}>
                        <a
                            href="https://forms.google.com/your-form-url"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#0070f3', textDecoration: 'underline' }}
                        >
                            お問い合わせフォーム（Googleフォーム）
                        </a>
                    </div>
                </section>

                <div style={{ marginTop: '50px', textAlign: 'center', fontSize: '14px', color: '#666' }}>2025年制定</div>
            </div>
        </main>
    );
}
