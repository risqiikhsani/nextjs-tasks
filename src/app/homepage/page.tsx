import Dashboard from "@/components/dashboard";

export default function Page() {
    return (
        <>
            <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">Homepage</h2>
                <article className="prose">
                    <p className="text-orange-500 text-xl mb-4">
                        This website is intended to showcase a simple Next.js CRUD application. 
                        You will need to create an account and log in for the website to work.
                    </p>
                    <p className="text-lg mb-2">
                        This website is built using the following technologies:
                    </p>
                    <ul className="list-disc list-inside text-lg">
                        <li>Next.js</li>
                        <li>Tailwind CSS</li>
                        <li>NextAuth</li>
                    </ul>
                </article>
            </div>
        </>
    );
}
