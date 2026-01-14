import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, type, message, locationInfo, sendCopy } = body; // sendCopyを追加

        // 1. トランスポーターの作成
        // 1. トランスポーターの作成
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 465, // デフォルトは465だが、587に変更可能にする
            secure: process.env.MAIL_SECURE !== 'false', // 'false'と明記しない限りtrue (465用)
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailContent = `
■お名前: ${name}
■メール: ${email}
■種別: ${type}
■対象箇所: ${locationInfo || 'なし'}

■内容:
${message}
        `;

        // 2. 管理者（自分）へのメール送信設定
        const adminMailOptions = {
            from: `"みんなのマチレポ" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_USER,
            replyTo: email,
            subject: `【お問い合わせ】${type}: ${name}様より`,
            text: `ウェブサイトからのお問い合わせがありました。\n${mailContent}`
        };

        // 管理者へ送信
        await transporter.sendMail(adminMailOptions);

        // 3. ユーザーへの控えメール送信（チェックがある場合のみ）
        if (sendCopy) {
            const userMailOptions = {
                from: `"みんなのマチレポ" <${process.env.MAIL_USER}>`,
                to: email, // ユーザーのアドレス
                subject: `【お問い合わせ控え】${type}`,
                text: `${name} 様\n\nお問い合わせありがとうございます。\n以下の内容で承りました。\n\n----------------------------${mailContent}\n----------------------------\n\n内容を確認次第、担当者よりご連絡いたします。\n※このメールは自動送信されています。`
            };
            await transporter.sendMail(userMailOptions);
        }

        return NextResponse.json({ success: true, message: 'メール送信成功' });
    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json({ success: false, message: '送信に失敗しました' }, { status: 500 });
    }
}
