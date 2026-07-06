import UploadForm from "@/components/UploadForm";

const Page = () => {
    return (
        <main className="new-book">
            <section className="flex flex-col gap-5 text-center">
                <h1 className="page-title-xl">Ajouter un nouveau livre</h1>
                <p className="subtitle">Uploadez un PDF pour générer votre expérience de lecture interactive</p>
            </section>

            <UploadForm />
        </main>
    )
}

export default Page
