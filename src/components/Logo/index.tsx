import Image from 'next/image';

export default function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
                src="https://i.postimg.cc/DZZjDf7d/AQOr-N-p-G00u-XSc-V2l-RUmf7j-Lc-P8l-Me-Yl-GYvt-Qd-i-He-IGew-V9pl2d1b-RH6b-EDm-V-v-Mq-Gbeeyq-F4smr-DO4l8i-Ai-P29qqy-ib8wx0-Qt.png"
                alt="Logo Novo Amigo"
                width={140}
                height={60}
                priority={true}
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
}