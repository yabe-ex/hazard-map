// src/app/terms/page.tsx
import React from 'react';
import StaticPageHeader from '@/components/StaticPageHeader'; // 作成した部品をインポート

export const metadata = {
    title: '利用規約 - みんなのマチレポ',
    description: 'みんなのマチレポの利用規約です。サービスの利用条件、禁止事項、免責事項について定めています。'
};

export default function TermsPage() {
    return (
        <main style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.8', background: '#f9f9f9', minHeight: '100vh' }}>
            {/* ▼▼▼ 共通ヘッダーを使用 ▼▼▼ */}
            <StaticPageHeader />

            {/* コンテンツエリア */}
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px 60px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>
                    利用規約
                </h1>

                <p style={{ marginBottom: '20px' }}>
                    この利用規約（以下，「本規約」といいます。）は，「みんなのマチレポ」（以下，「本サービス」といいます。）の利用条件を定めるものです。
                    ユーザーの皆様には，本規約に従って，本サービスをご利用いただきます。
                </p>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第1条（適用）</h2>
                    <p>
                        本規約は，ユーザーと本サービス運営者（以下，「運営者」といいます。）との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第2条（禁止事項）</h2>
                    <p>ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                        <li>法令または公序良俗に違反する行為</li>
                        <li>犯罪行為に関連する行為</li>
                        <li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li>
                        <li>運営者，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
                        <li>本サービスの運営を妨害するおそれのある行為</li>
                        <li>不正アクセスをし，またはこれを試みる行為</li>
                        <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                        <li>不正な目的を持って本サービスを利用する行為</li>
                        <li>
                            本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為（特定の個人への誹謗中傷、プライバシー侵害を含む）
                        </li>
                        <li>虚偽の情報を意図的に登録する行為</li>
                        <li>その他，運営者が不適切と判断する行為</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第3条（本サービスの提供の停止等）</h2>
                    <p>
                        運営者は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                        <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                        <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
                        <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                        <li>その他，運営者が本サービスの提供が困難と判断した場合</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第4条（利用制限および登録抹消）</h2>
                    <p>
                        運営者は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，または投稿データを削除することができるものとします。
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                        <li>本規約のいずれかの条項に違反した場合</li>
                        <li>その他，運営者が本サービスの利用を適当でないと判断した場合</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第5条（投稿コンテンツの権利）</h2>
                    <p>
                        ユーザーは、自らが投稿したデータ（テキスト、画像、位置情報等）について、適法な権利を有していること、および第三者の権利を侵害していないことを保証するものとします。
                        投稿されたコンテンツの著作権はユーザーに帰属しますが、運営者は、本サービスの運営、改善、宣伝等の目的の範囲内で、ユーザーに通知することなく、これらを無償で利用（複製、複写、改変、第三者への再許諾その他のあらゆる利用を含む）できるものとします。
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第6条（免責事項）</h2>
                    <p>
                        運営者は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                        運営者は，本サービスに起因してユーザーに生じたあらゆる損害について、一切の責任を負いません。
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第7条（サービス内容の変更等）</h2>
                    <p>
                        運営者は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第8条（ポイント・称号等の取り扱い）</h2>
                    <p>
                        本サービス内で獲得できる「スコア」「称号」等のゲーミフィケーション要素（以下「デジタル特典」といいます。）について、以下の通り定めます。
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                        <li>デジタル特典は、本サービス内でのみ有効であり、金銭的な価値を持ちません。金銭やその他の物品との交換・換金は一切できません。</li>
                        <li>ユーザーが退会した場合、またはアカウントが削除された場合、保有するすべてのデジタル特典は失効します。</li>
                        <li>運営者は、デジタル特典の付与条件や内容を、事前の予告なく変更・廃止することができるものとします。</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第9条（利用規約の変更）</h2>
                    <p>運営者は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。</p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#444' }}>第10条（準拠法・裁判管轄）</h2>
                    <p>
                        本規約の解釈にあたっては，日本法を準拠法とします。本サービスに関して紛争が生じた場合には，運営者の所在地を管轄する裁判所（さいたま地方裁判所）を専属的合意管轄裁判所とします。
                    </p>
                </section>

                <div style={{ marginTop: '50px', textAlign: 'center', fontSize: '14px', color: '#666' }}>2025年制定</div>
            </div>
        </main>
    );
}
