export default function Layout({children}: {children: React.ReactNode}) {
    return (

            <div className="container text-center">
            {children}
            </div>
    );
}