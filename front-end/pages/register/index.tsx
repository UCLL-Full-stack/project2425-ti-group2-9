import Head from "next/head";
import Header from "@components/headers";
import UserRegisterForm from "@components/users/UserRegisterForm";


const Register: React.FC = () => {

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserRegisterForm />
                </section>
            </main>
        </>
    );
};

export default Register;
