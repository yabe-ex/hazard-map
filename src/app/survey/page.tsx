import { SurveyForm } from './SurveyForm';
import styles from './survey.module.css';

export const metadata = {
    title: '子どもの外遊びと安全に関するアンケート | みんなのマチレポ',
    description: 'お子さまの外遊びと地域の安全に関するアンケートへのご協力をお願いします。',
    robots: {
        index: false,
        follow: false,
    },
};

// ランダムな6桁の英数字（問い合わせコード）はクライアント側（SurveyForm）で生成します

export default function SurveyPage() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        子どもの外遊びと安全に関する<br />アンケート
                    </h1>
                    <div className={styles.divider}></div>
                </header>

                <div className={styles.introCard}>
                    <p className={styles.introText}>
                        この度はアンケートにご協力いただきありがとうございます。<br />
                        本アンケートは、お子さまが一人で外遊びできるようになった時期や、保護者の方が地域に対して感じている不安の変化について調査し、より安全なまちづくりのための基礎データとすることを目的としています。
                    </p>
                    <div className={styles.timeEstimate}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', color: '#3b82f6' }}>
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        所要時間は3分程度です。
                    </div>
                </div>

                <SurveyForm />
            </div>
        </div>
    );
}
