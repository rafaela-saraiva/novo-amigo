import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" aria-label="Ir para página inicial">
                <Image
                    src="https://i.postimg.cc/XNtcXKM2/logo.png"
                    alt="Logo Novo Amigo"
                    width={120}
                    height={80}
                    priority={true}
                    style={{ objectFit: 'contain' }}
                />
            </Link>
        </div>
    );
}