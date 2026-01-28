'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './survey.module.css';

type SurveyFormProps = {
    // Removed inquiryCode since it's now generated internally
};

export function SurveyForm({ }: SurveyFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [inquiryCode, setInquiryCode] = useState('');

    useEffect(() => {
        const generateCode = async () => {
            // ユーザーの環境情報＋現在時刻＋ランダム値を組み合わせる
            const ua = navigator.userAgent;
            const time = Date.now().toString();
            // IPアドレスの取得は外部依存のリスクがあるため、代わりに高強度のランダムUUIDを使用
            // これにより「他人と被らない」一意性を担保します
            const random = typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString();

            const rawString = `${ua}-${time}-${random}`;

            // SHA-256ハッシュ化
            const msgBuffer = new TextEncoder().encode(rawString);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            // 先頭6文字を取得し、大文字にしてコードとする
            const code = hashHex.substring(0, 6).toUpperCase();
            setInquiryCode(code);
        };

        generateCode().catch(e => {
            console.error('Code generation failed:', e);
            // 万が一のフォールバック
            setInquiryCode('ERR' + Math.floor(Math.random() * 1000));
        });
    }, []);

    // Form states
    const [formData, setFormData] = useState({
        q1_age: '',
        q2_child_grade: '',
        q3_current_area: '',
        q4_growth_area: '',

        // Q5: Child Matrix
        q5_child_300m: '',
        q5_child_500m: '',
        q5_child_1km: '',
        q5_child_over_1km: '',

        // Q6: Parent Matrix
        q6_parent_300m: '',
        q6_parent_500m: '',
        q6_parent_1km: '',
        q6_parent_over_1km: '',

        q7_conditions: '',
        q8_anxieties: [] as string[],
        q9_anxiety_compare: '',
        q10_anxiety_reasons: [] as string[],
        q11_anxiety_places_exist: '',
        q12_anxiety_places: [] as string[],
        q13_share_mechanism: '',
        q14_free_comment: '',
        q15_interest: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Basic validation
        if (
            !formData.q1_age ||
            !formData.q2_child_grade ||

            // Validate Q5 Matrix
            !formData.q5_child_300m ||
            !formData.q5_child_500m ||
            !formData.q5_child_1km ||
            !formData.q5_child_over_1km ||

            // Validate Q6 Matrix
            !formData.q6_parent_300m ||
            !formData.q6_parent_500m ||
            !formData.q6_parent_1km ||
            !formData.q6_parent_over_1km ||

            formData.q8_anxieties.length === 0 ||
            !formData.q14_free_comment ||
            !formData.q15_interest
        ) {
            setError('必須項目を入力してください。');
            setIsSubmitting(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        try {
            // Direct Supabase Insert (Client-Side)
            // Note: RLS policies must allow INSERT for 'anon' role
            const { error: insertError } = await supabase
                .from('survey_responses')
                .insert({
                    inquiry_code: inquiryCode,
                    ...formData, // Spread all form fields
                });

            if (insertError) {
                console.error('Supabase Error:', insertError);
                throw new Error(insertError.message || 'データベースへの保存に失敗しました');
            }

            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            console.error('Submission Error:', err);
            setError(err.message || 'エラーが発生しました。もう一度お試しください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCheckboxChange = (field: 'q8_anxieties' | 'q10_anxiety_reasons' | 'q12_anxiety_places', value: string) => {
        setFormData(prev => {
            const current = prev[field];
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...current, value] };
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isSubmitted) {
        return (
            <div className={styles.successCard}>
                <h2 className={styles.successTitle}>送信完了</h2>
                <p className={styles.successText}>アンケートへのご協力ありがとうございました。<br />貴重なご意見として活用させていただきます。</p>
                <div className={styles.successCodeBox}>
                    <p className={styles.successCodeLabel}>あなたの問合せコード</p>
                    <p className={styles.successCodeValue}>{inquiryCode}</p>
                </div>
                <div>
                    <a href="/" className={styles.backLink}>トップページへ戻る</a>
                </div>
            </div>
        );
    }

    const q8Options = [
        '夜になると暗い道',
        '見通しの悪い曲がり角',
        '歩道が狭い道路',
        '人通りが極端に少ない場所',
        '子どもだけになりやすい場所',
        '交通量が多い大通り',
        '信号や横断歩道が分かりにくい交差点',
        '車のスピードが速い道路',
        '駐車車両が多く、周囲が見えにくい場所',
        '周囲に大人の目が届きにくい場所',
        'その他'
    ];

    const gradeOptions = [
        'まだ',
        '小1-2',
        '小3-4',
        '小5-6',
        '中学生以降'
    ];

    const renderMatrixRow = (label: string, name: string, value: string) => (
        <tr>
            <td>{label}</td>
            <td>
                <select
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={styles.matrixSelect}
                    required
                >
                    <option value="">選択</option>
                    {gradeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </td>
        </tr>
    );

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
                <div className={styles.error}>
                    <p><strong>入力エラー</strong></p>
                    <p>{error}</p>
                </div>
            )}

            <div className={styles.codeCard}>
                <span className={styles.codeLabel}>このアンケートの問合せコード</span>
                <span className={styles.codeValue}>{inquiryCode}</span>
            </div>

            {/* Q1 */}
            <section className={styles.section}>
                <label className={styles.label}>Q1. 回答者の年代 <span className={styles.required}>必須</span></label>
                <select
                    name="q1_age"
                    value={formData.q1_age}
                    onChange={handleChange}
                    className={styles.select}
                    required
                >
                    <option value="">選択してください</option>
                    <option value="30歳未満">30歳未満</option>
                    <option value="30代前半">30代前半（30〜34）</option>
                    <option value="30代後半">30代後半（35〜39）</option>
                    <option value="40代前半">40代前半（40〜44）</option>
                    <option value="40代後半">40代後半（45〜49）</option>
                    <option value="50代前半">50代前半（50〜54）</option>
                    <option value="50代後半">50代後半（55〜59）</option>
                    <option value="60代以上">60代以上</option>
                </select>
            </section>

            {/* Q2 */}
            <section className={styles.section}>
                <label className={styles.label}>Q2. お子さんの学年 <span className={styles.required}>必須</span></label>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>※ 末子または今回主に考えているお子さんについてお答えください</p>
                <select
                    name="q2_child_grade"
                    value={formData.q2_child_grade}
                    onChange={handleChange}
                    className={styles.select}
                    required
                >
                    <option value="">選択してください</option>
                    <option value="小学1年">小学1年</option>
                    <option value="小学2年">小学2年</option>
                    <option value="小学3年">小学3年</option>
                    <option value="小学4年">小学4年</option>
                    <option value="小学5年">小学5年</option>
                    <option value="小学6年">小学6年</option>
                    <option value="中学1年">中学1年</option>
                    <option value="中学2年">中学2年</option>
                    <option value="中学3年">中学3年</option>
                    <option value="高校1年">高校1年</option>
                    <option value="高校2年">高校2年</option>
                    <option value="高校3年">高校3年</option>
                </select>
            </section>

            <div className={styles.separator}></div>

            {/* Q3 */}
            <section className={styles.section}>
                <label className={styles.label}>Q3. 現在のお住まいのエリア</label>
                <select
                    name="q3_current_area"
                    value={formData.q3_current_area}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="">選択してください</option>
                    <option value="大都市中心部">大都市中心部</option>
                    <option value="都市部">都市部</option>
                    <option value="郊外">郊外</option>
                    <option value="地方都市">地方都市</option>
                    <option value="地方郊外">地方郊外</option>
                    <option value="田舎・農村部">田舎・農村部</option>
                </select>
            </section>

            {/* Q4 */}
            <section className={styles.section}>
                <label className={styles.label}>Q4. ご自身が育った頃の居住エリア</label>
                <select
                    name="q4_growth_area"
                    value={formData.q4_growth_area}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="">選択してください</option>
                    <option value="大都市中心部">大都市中心部</option>
                    <option value="都市部">都市部</option>
                    <option value="郊外">郊外</option>
                    <option value="地方都市">地方都市</option>
                    <option value="地方郊外">地方郊外</option>
                    <option value="田舎・農村部">田舎・農村部</option>
                </select>
            </section>

            <div className={styles.separator}></div>

            {/* Q5 Matrix */}
            <section className={styles.section}>
                <label className={styles.label}>Q5. 現在のお子さんについて <span className={styles.required}>必須</span></label>
                <p style={{ marginBottom: '1rem', color: '#4b5563' }}>保護者の付き添いなしで、一人で行けるようになった時期として、当てはまるものを選んでください。</p>

                <div className={styles.tableWrapper}>
                    <table className={styles.matrixTable}>
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>行動範囲</th>
                                <th>時期</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderMatrixRow('家の近所（〜300m）', 'q5_child_300m', formData.q5_child_300m)}
                            {renderMatrixRow('少し離れた場所（〜500m）', 'q5_child_500m', formData.q5_child_500m)}
                            {renderMatrixRow('徒歩圏（〜1km）', 'q5_child_1km', formData.q5_child_1km)}
                            {renderMatrixRow('それ以上（1km超）', 'q5_child_over_1km', formData.q5_child_over_1km)}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Q6 Matrix */}
            <section className={styles.section}>
                <label className={styles.label}>Q6. ご自身が子どもの頃について <span className={styles.required}>必須</span></label>
                <p style={{ marginBottom: '1rem', color: '#4b5563' }}>保護者の付き添いなしで、一人で行けるようになった時期として、当てはまるものを選んでください。</p>

                <div className={styles.tableWrapper}>
                    <table className={styles.matrixTable}>
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>行動範囲</th>
                                <th>時期</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderMatrixRow('家の近所（〜300m）', 'q6_parent_300m', formData.q6_parent_300m)}
                            {renderMatrixRow('少し離れた場所（〜500m）', 'q6_parent_500m', formData.q6_parent_500m)}
                            {renderMatrixRow('徒歩圏（〜1km）', 'q6_parent_1km', formData.q6_parent_1km)}
                            {renderMatrixRow('それ以上（1km超）', 'q6_parent_over_1km', formData.q6_parent_over_1km)}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Q7 */}
            <section className={styles.section}>
                <label className={styles.label}>Q7. 一人で外出・行動する際の条件（時間・場所など）があれば教えてください。</label>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>条件を設けていた時期があれば、学年もご記入ください。</p>
                <textarea
                    name="q7_conditions"
                    value={formData.q7_conditions}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="例：17時までには帰る、大通りを通る、公園以外には行かない、など"
                    style={{ height: '100px' }}
                />
            </section>

            {/* Q8 */}
            <section className={styles.section}>
                <label className={styles.label}>Q8. 一人で外遊びをさせる際、不安に感じること（複数選択） <span className={styles.required}>必須</span></label>
                <div className={styles.checkboxGrid}>
                    {q8Options.map(option => (
                        <label key={option} className={styles.optionLabel}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={formData.q8_anxieties.includes(option)}
                                onChange={() => handleCheckboxChange('q8_anxieties', option)}
                                className={styles.checkbox}
                            />
                            <span className={styles.optionText}>{option}</span>
                        </label>
                    ))}
                </div>
            </section>

            <div className={styles.separator}></div>

            {/* Q9 */}
            <section className={styles.section}>
                <label className={styles.label}>Q9. 昔と比べて、子どもの外遊びに対する不安は</label>
                <div className={styles.radioGroup}>
                    {['明らかに増えた', '少し増えた', 'あまり変わらない', 'むしろ減った', '分からない'].map(option => (
                        <label key={option} className={styles.optionLabel}>
                            <input
                                type="radio"
                                name="q9_anxiety_compare"
                                value={option}
                                checked={formData.q9_anxiety_compare === option}
                                onChange={handleChange}
                                className={styles.radio}
                            />
                            <span className={styles.optionText}>{option}</span>
                        </label>
                    ))}
                </div>
            </section>

            {/* Q10 */}
            {(formData.q9_anxiety_compare === '明らかに増えた' || formData.q9_anxiety_compare === '少し増えた') && (
                <section className={styles.section} style={{ backgroundColor: '#f9fafb' }}>
                    <label className={styles.label}>Q10. 不安が増えたと感じる理由として、近いものを選んでください（複数選択）</label>
                    <div className={styles.checkboxGrid}>
                        {[
                            '実際の治安悪化を感じる',
                            '交通量が増えたと感じる',
                            '街の構造が変わった（道路・建物・人の流れなど）',
                            'ニュースやSNSなどの情報の影響',
                            '周囲（他の保護者など）の価値観が変わった',
                            '自分が親になったから',
                            '自分が育った地域と、今住んでいる地域が違うから',
                            '近所付き合いや地域のつながりが減ったから',
                            '子どもの行動範囲が広がってきたから',
                            'はっきりした理由はない'
                        ].map(option => (
                            <label key={option} className={styles.optionLabel}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={formData.q10_anxiety_reasons.includes(option)}
                                    onChange={() => handleCheckboxChange('q10_anxiety_reasons', option)}
                                    className={styles.checkbox}
                                />
                                <span className={styles.optionText}>{option}</span>
                            </label>
                        ))}
                    </div>
                </section>
            )}

            {/* Q11 */}
            <section className={styles.section}>
                <label className={styles.label}>Q11. 「危険ではないが、不安を感じる場所」はありますか？</label>
                <div className={styles.radioGroup}>
                    {['よくある', '時々ある', 'あまりない', 'ない'].map(option => (
                        <label key={option} className={styles.optionLabel}>
                            <input
                                type="radio"
                                name="q11_anxiety_places_exist"
                                value={option}
                                checked={formData.q11_anxiety_places_exist === option}
                                onChange={handleChange}
                                className={styles.radio}
                            />
                            <span className={styles.optionText}>{option}</span>
                        </label>
                    ))}
                </div>
            </section>

            {/* Q12 */}
            {(formData.q11_anxiety_places_exist === 'よくある' || formData.q11_anxiety_places_exist === '時々ある') && (
                <section className={styles.section} style={{ backgroundColor: '#f9fafb' }}>
                    <label className={styles.label}>Q12. どのような場所で不安を感じやすいですか？（複数選択）</label>
                    <div className={styles.checkboxGrid}>
                        {['夜になると暗い道', '見通しの悪い曲がり角', '歩道が狭い道路', '人通りが極端に少ない場所', '子どもだけになる場所', 'その他'].map(option => (
                            <label key={option} className={styles.optionLabel}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={formData.q12_anxiety_places.includes(option)}
                                    onChange={() => handleCheckboxChange('q12_anxiety_places', option)}
                                    className={styles.checkbox}
                                />
                                <span className={styles.optionText}>{option}</span>
                            </label>
                        ))}
                    </div>
                </section>
            )}

            {/* Q13 */}
            <section className={styles.section}>
                <label className={styles.label}>Q13. そうした「不安」を共有・可視化できる仕組みについて</label>
                <div className={styles.radioGroup}>
                    {['とてもあったほうがいい', 'あれば参考にしたい', 'どちらとも言えない', 'あまり必要ない'].map(option => (
                        <label key={option} className={styles.optionLabel}>
                            <input
                                type="radio"
                                name="q13_share_mechanism"
                                value={option}
                                checked={formData.q13_share_mechanism === option}
                                onChange={handleChange}
                                className={styles.radio}
                            />
                            <span className={styles.optionText}>{option}</span>
                        </label>
                    ))}
                </div>
            </section>

            {/* Q14 (Required + Changed Label) */}
            <section className={styles.section}>
                <label className={styles.label}>Q14. 子どもの外遊びや街の安全について、感じていることを教えてください <span className={styles.required}>必須</span></label>
                <textarea
                    name="q14_free_comment"
                    value={formData.q14_free_comment}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="ご自由にお書きください"
                    required
                />
            </section>

            {/* Q15 (Required) */}
            <section className={styles.section}>
                <label className={styles.label}>Q15. 地域の「不安」を集める実証実験に興味はありますか？ <span className={styles.required}>必須</span></label>
                <div className={styles.radioGroup}>
                    {['興味がある', '内容によっては協力したい', '今回はアンケートのみ', '興味はない'].map(option => (
                        <label key={option} className={styles.optionLabel}>
                            <input
                                type="radio"
                                name="q15_interest"
                                value={option}
                                checked={formData.q15_interest === option}
                                onChange={handleChange}
                                className={styles.radio}
                            />
                            <span className={styles.optionText}>{option}</span>
                        </label>
                    ))}
                </div>
            </section>

            <div style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                >
                    {isSubmitting ? '送信中...' : 'アンケートを送信する'}
                </button>
            </div>
        </form>
    );
}
