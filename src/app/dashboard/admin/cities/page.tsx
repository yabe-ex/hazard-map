'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { CityData } from '@/constants/cities';
import { PREFECTURES } from '@/constants/prefectures';

export default function AdminCitiesPage() {
    const router = useRouter();
    const [cities, setCities] = useState<CityData[]>([]);
    const [loading, setLoading] = useState(true);
    const [myRole, setMyRole] = useState<any>(null);

    // 編集モーダル用
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCity, setEditingCity] = useState<Partial<CityData> | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        checkAuthAndFetch();
    }, []);

    const checkAuthAndFetch = async () => {
        setLoading(true);
        const {
            data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
            router.replace('/');
            return;
        }

        const { data: roleData } = await supabase.from('admin_roles').select('*').eq('user_id', user.id).single();
        setMyRole(roleData);

        if (roleData?.role !== 'super_admin') {
            toast.error('権限がありません');
            router.replace('/dashboard');
            return;
        }

        fetchCities();
    };

    const fetchCities = async () => {
        const { data, error } = await supabase.from('cities').select('*').order('id');
        if (error) {
            toast.error('データ取得に失敗しました');
        } else {
            setCities(data || []);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCity) return;
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('cities')
                .upsert({
                    id: editingCity.id,
                    name: editingCity.name,
                    slug: editingCity.slug,
                    lat: editingCity.lat,
                    lng: editingCity.lng,
                    zoom: editingCity.zoom || 13,
                    prefecture_code: editingCity.prefecture_code || '11',
                    parent_city_id: editingCity.parent_city_id || null,
                    is_designated: editingCity.is_designated || false
                })
                .select();

            if (error) throw error;

            toast.success('保存しました');
            setIsModalOpen(false);
            setEditingCity(null);
            fetchCities();
        } catch (e) {
            console.error(e);
            toast.error('エラーが発生しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`${name} (ID: ${id}) を削除しますか？\nこの操作は取り消せません。`)) return;

        const { error } = await supabase.from('cities').delete().eq('id', id);
        if (error) {
            toast.error('削除失敗');
        } else {
            toast.success('削除しました');
            fetchCities();
        }
    };

    const openEdit = (city: CityData) => {
        setEditingCity({ ...city });
        setIsModalOpen(true);
    };
    const openNew = () => {
        setEditingCity({
            id: '',
            name: '',
            slug: '',
            lat: 35.8,
            lng: 139.5,
            zoom: 13,
            // @ts-ignore
            prefecture_code: '11'
        });
        setIsModalOpen(true);
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>読み込み中...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', color: '#fff' }}>
            <Toaster />

            {/* 背景設定 (dashboard/teamなどと合わせるため、ここでは簡易的にbody styleは弄らないが、文字色は白にする) */}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={() => router.back()}
                        style={{ marginRight: '15px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: 'white' }}
                    >
                        ←
                    </button>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>自治体マスタ管理 (Super Admin)</h1>
                </div>
                <button
                    onClick={openNew}
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
                    + 新規登録
                </button>
            </div>

            <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#333', fontSize: '14px' }}>
                    <thead style={{ background: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>都道府県</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>自治体名</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Slug</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>緯度 / 経度</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city) => (
                            <tr key={city.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px' }}>
                                    {(() => {
                                        const p = PREFECTURES[city.prefecture_code || ''] || { name: city.prefecture_code, color: '#95a5a6' };
                                        return <span style={{ color: p.color, fontWeight: 'bold' }}>{p.name}</span>;
                                    })()}
                                </td>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>{city.id}</td>
                                <td style={{ padding: '12px' }}>{city.name}</td>
                                <td style={{ padding: '12px', fontFamily: 'monospace' }}>{city.slug}</td>
                                <td style={{ padding: '12px', fontSize: '12px' }}>
                                    {city.lat.toFixed(4)}, {city.lng.toFixed(4)}
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => openEdit(city)}
                                        style={{
                                            marginRight: '8px',
                                            padding: '4px 8px',
                                            background: '#3498db',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        編集
                                    </button>
                                    <button
                                        onClick={() => handleDelete(city.id, city.name)}
                                        style={{
                                            padding: '4px 8px',
                                            background: '#e74c3c',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        削除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 編集モーダル */}
            {isModalOpen && editingCity && (
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
                >
                    <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '400px', color: '#333' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                            {editingCity.id ? '編集' : '新規登録'}
                        </h2>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ fontSize: '12px', color: '#555' }}>自治体コード (ID)</label>
                                <input
                                    value={editingCity.id || ''}
                                    onChange={(e) => setEditingCity({ ...editingCity, id: e.target.value })}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '12px', color: '#555' }}>自治体名</label>
                                <input
                                    value={editingCity.name || ''}
                                    onChange={(e) => setEditingCity({ ...editingCity, name: e.target.value })}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '12px', color: '#555' }}>Slug (URLに使用)</label>
                                <input
                                    value={editingCity.slug || ''}
                                    onChange={(e) => setEditingCity({ ...editingCity, slug: e.target.value })}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '12px', color: '#555' }}>都道府県 (Prefecture)</label>
                                <select
                                    value={editingCity.prefecture_code || '11'}
                                    onChange={(e) => setEditingCity({ ...editingCity, prefecture_code: e.target.value })}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                >
                                    {Object.entries(PREFECTURES).map(([code, data]) => (
                                        <option key={code} value={code}>
                                            {data.name} ({code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    id="is_designated"
                                    checked={editingCity.is_designated || false}
                                    onChange={(e) => setEditingCity({ ...editingCity, is_designated: e.target.checked })}
                                />
                                <label htmlFor="is_designated" style={{ fontSize: '12px', color: '#333', cursor: 'pointer' }}>
                                    政令指定都市 (Designated City) - 他の区の親になる場合
                                </label>
                            </div>

                            {!editingCity.is_designated && (
                                <div>
                                    <label style={{ fontSize: '12px', color: '#555' }}>親自治体 (Parent City)</label>
                                    <select
                                        value={editingCity.parent_city_id || ''}
                                        onChange={(e) => setEditingCity({ ...editingCity, parent_city_id: e.target.value || null })}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    >
                                        <option value="">(なし)</option>
                                        {cities.filter(c => c.is_designated).map(parent => (
                                            <option key={parent.id} value={parent.id}>
                                                {parent.name} ({parent.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '12px', color: '#555' }}>緯度 (Lat)</label>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        value={editingCity.lat || 0}
                                        onChange={(e) => setEditingCity({ ...editingCity, lat: parseFloat(e.target.value) })}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '12px', color: '#555' }}>経度 (Lng)</label>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        value={editingCity.lng || 0}
                                        onChange={(e) => setEditingCity({ ...editingCity, lng: parseFloat(e.target.value) })}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{ flex: 1, padding: '10px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    キャンセル
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        flex: 2,
                                        padding: '10px',
                                        background: '#3498db',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isSubmitting ? '保存中...' : '保存'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
