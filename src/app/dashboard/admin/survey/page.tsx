'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type SurveyResponse = {
    id: string;
    inquiry_code: string;
    created_at: string;
    q1_age: string;
    q2_child_grade: string;
    q3_current_area: string;
    q8_anxieties: string[];
    q14_free_comment: string;
    // All other fields
    q4_growth_area: string;
    q5_child_300m: string;
    q5_child_500m: string;
    q5_child_1km: string;
    q5_child_over_1km: string;
    q6_parent_300m: string;
    q6_parent_500m: string;
    q6_parent_1km: string;
    q6_parent_over_1km: string;
    q7_conditions: string;
    q9_anxiety_compare: string;
    q10_anxiety_reasons: string[];
    q11_anxiety_places_exist: string;
    q12_anxiety_places: string[];
    q13_share_mechanism: string;
    q15_interest: string;
};

export default function AdminSurveyPage() {
    const router = useRouter();
    const [data, setData] = useState<SurveyResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<SurveyResponse | null>(null);

    useEffect(() => {
        checkAuthAndFetch();
    }, []);

    const checkAuthAndFetch = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.replace('/');
            return;
        }

        const { data: roleData } = await supabase.from('admin_roles').select('*').eq('user_id', user.id).single();

        if (!roleData || roleData.role !== 'super_admin') {
            toast.error('権限がありません');
            router.replace('/dashboard');
            return;
        }

        fetchSurveyData();
    };

    const fetchSurveyData = async () => {
        const { data: surveyData, error } = await supabase
            .from('survey_responses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
            toast.error('データ取得に失敗しました');
        } else {
            setData(surveyData || []);
        }
        setLoading(false);
    };

    const downloadCsv = () => {
        if (data.length === 0) {
            toast.error('データがありません');
            return;
        }

        // Define headers
        const headers = [
            'ID',
            '送信日時',
            '問合せコード',
            'Q1(年代)',
            'Q2(学年)',
            'Q3(現在エリア)',
            'Q4(成育エリア)',
            'Q5(子/〜300m)',
            'Q5(子/〜500m)',
            'Q5(子/〜1km)',
            'Q5(子/1km超)',
            'Q6(親/〜300m)',
            'Q6(親/〜500m)',
            'Q6(親/〜1km)',
            'Q6(親/1km超)',
            'Q7(条件)',
            'Q8(不安)',
            'Q9(不安比較)',
            'Q10(不安理由)',
            'Q11(不安場所有無)',
            'Q12(不安場所)',
            'Q13(共有)',
            'Q14(自由記述)',
            'Q15(興味)'
        ];

        const escape = (val: any) => `"${String(val || '').replace(/"/g, '""')}"`;
        const rows = data.map(item => [
            escape(item.id),
            escape(new Date(item.created_at).toLocaleString('ja-JP')),
            escape(item.inquiry_code),
            escape(item.q1_age),
            escape(item.q2_child_grade),
            escape(item.q3_current_area),
            escape(item.q4_growth_area),
            escape(item.q5_child_300m),
            escape(item.q5_child_500m),
            escape(item.q5_child_1km),
            escape(item.q5_child_over_1km),
            escape(item.q6_parent_300m),
            escape(item.q6_parent_500m),
            escape(item.q6_parent_1km),
            escape(item.q6_parent_over_1km),
            escape(item.q7_conditions),
            escape((item.q8_anxieties || []).join(' | ')),
            escape(item.q9_anxiety_compare),
            escape((item.q10_anxiety_reasons || []).join(' | ')),
            escape(item.q11_anxiety_places_exist),
            escape((item.q12_anxiety_places || []).join(' | ')),
            escape(item.q13_share_mechanism),
            escape(item.q14_free_comment),
            escape(item.q15_interest)
        ].join(','));

        const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `survey_results_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>読み込み中...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', color: '#fff' }}>
            <Toaster />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={() => router.back()}
                        style={{ marginRight: '15px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: 'white' }}
                    >
                        ←
                    </button>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>アンケート結果一覧 (Super Admin)</h1>
                </div>
                <button
                    onClick={downloadCsv}
                    style={{
                        padding: '10px 20px',
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    CSVダウンロード
                </button>
            </div>

            <div style={{ paddingBottom: '10px', fontSize: '14px', color: '#ccc' }}>
                合計: {data.length} 件
            </div>

            <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#333', fontSize: '14px', whiteSpace: 'nowrap' }}>
                    <thead style={{ background: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>問合せコード</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>日時</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>年代</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>子供学年</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>居住エリア</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>成育エリア</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 'bold' }}>{item.inquiry_code}</td>
                                <td style={{ padding: '12px' }}>{new Date(item.created_at).toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                                <td style={{ padding: '12px' }}>{item.q1_age}</td>
                                <td style={{ padding: '12px' }}>{item.q2_child_grade}</td>
                                <td style={{ padding: '12px' }}>{item.q3_current_area}</td>
                                <td style={{ padding: '12px' }}>{item.q4_growth_area}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => setSelectedItem(item)}
                                        style={{
                                            padding: '6px 12px',
                                            background: '#3498db',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        詳細
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                    データがありません
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 詳細モーダル */}
            {selectedItem && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 999
                    }}
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            width: '90%',
                            maxWidth: '800px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            color: '#333',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>回答詳細</h2>
                            <button
                                onClick={() => setSelectedItem(null)}
                                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}
                            >
                                ×
                            </button>
                        </div>

                        <div style={{ padding: '20px' }}>
                            <Section title="基本情報">
                                <Item label="送信日時" value={new Date(selectedItem.created_at).toLocaleString('ja-JP')} />
                                <Item label="問合せコード" value={selectedItem.inquiry_code} />
                                <Item label="Q1. 年代" value={selectedItem.q1_age} />
                                <Item label="Q2. 子供学年" value={selectedItem.q2_child_grade} />
                                <Item label="Q3. 現在エリア" value={selectedItem.q3_current_area} />
                                <Item label="Q4. 成育エリア" value={selectedItem.q4_growth_area} />
                            </Section>

                            <Section title="Q5. お子さんの行動範囲 (Matrix)">
                                <MatrixRow label="家の近所(〜300m)" value={selectedItem.q5_child_300m} />
                                <MatrixRow label="少し離れた場所(〜500m)" value={selectedItem.q5_child_500m} />
                                <MatrixRow label="徒歩圏(〜1km)" value={selectedItem.q5_child_1km} />
                                <MatrixRow label="それ以上(1km超)" value={selectedItem.q5_child_over_1km} />
                            </Section>

                            <Section title="Q6. 親自身の子供の頃 (Matrix)">
                                <MatrixRow label="家の近所(〜300m)" value={selectedItem.q6_parent_300m} />
                                <MatrixRow label="少し離れた場所(〜500m)" value={selectedItem.q6_parent_500m} />
                                <MatrixRow label="徒歩圏(〜1km)" value={selectedItem.q6_parent_1km} />
                                <MatrixRow label="それ以上(1km超)" value={selectedItem.q6_parent_over_1km} />
                            </Section>

                            <Section title="Q7. 条件">
                                <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{selectedItem.q7_conditions || '(なし)'}</p>
                            </Section>

                            <Section title="不安・意識">
                                <Item label="Q8. 不安要素" value={(selectedItem.q8_anxieties || []).join(', ')} />
                                <Item label="Q9. 昔との比較" value={selectedItem.q9_anxiety_compare} />
                                <Item label="Q10. 増加理由" value={(selectedItem.q10_anxiety_reasons || []).join(', ')} />
                                <Item label="Q11. 不安場所有無" value={selectedItem.q11_anxiety_places_exist} />
                                <Item label="Q12. 具体的不安場所" value={(selectedItem.q12_anxiety_places || []).join(', ')} />
                                <Item label="Q13. 共有の仕組み" value={selectedItem.q13_share_mechanism} />
                            </Section>

                            <Section title="Q14. 自由記述">
                                <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                                    {selectedItem.q14_free_comment}
                                </div>
                            </Section>

                            <Section title="Q15. 興味">
                                <p style={{ fontWeight: 'bold' }}>{selectedItem.q15_interest}</p>
                            </Section>
                        </div>

                        <div style={{ padding: '20px', borderTop: '1px solid #eee', textAlign: 'right' }}>
                            <button
                                onClick={() => setSelectedItem(null)}
                                style={{
                                    padding: '10px 20px',
                                    background: '#ccc',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helpers
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', borderLeft: '4px solid #3498db', paddingLeft: '10px', marginBottom: '15px', color: '#2c3e50' }}>{title}</h3>
        <div style={{ paddingLeft: '10px' }}>{children}</div>
    </div>
);

const Item = ({ label, value }: { label: string, value: string }) => (
    <div style={{ marginBottom: '8px', display: 'flex' }}>
        <span style={{ fontWeight: 'bold', width: '150px', flexShrink: 0, color: '#555' }}>{label}:</span>
        <span>{value || '-'}</span>
    </div>
);

const MatrixRow = ({ label, value }: { label: string, value: string }) => (
    <div style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '8px 0' }}>
        <span style={{ width: '200px', color: '#555' }}>{label}</span>
        <span style={{ fontWeight: 'bold' }}>{value}</span>
    </div>
);
