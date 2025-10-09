import Image from 'next/image';

export default function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
                src="https://i.postimg.cc/43gQFF0v/560157153-858862503968347-5622696388776036153-n.png"
                alt="Logo Novo Amigo"
                width={250}
                height={290}
                priority={true}
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
}   