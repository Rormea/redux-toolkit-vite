import { Badge, Button, Card, TextInput, Title } from "@tremor/react"
import { useUsersActions } from "../hooks/useUsersActions";
import { useState } from 'react';




const CreateNewUser = () => {

    const { addUser } = useUsersActions()

    const [result, setResult] = useState<"ok" | "ko" | null>(null)

    // interface FormEvent extends Event {
    //     target: HTMLFormElement;
    // }

    const handlerSubmitNewUser = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        if (!name || !email || !github) {
            // validaciones que tu quieras
            return setResult("ko")
        }

        addUser({ name, email, github, })
        setResult("ok")
        form.reset();
    };


    return (
        <Card className="mt-10" >

            <Title className="py-3" >Crear nuevo usuario</Title>

            <form
                onSubmit={handlerSubmitNewUser}
                className="" >
                <TextInput
                    name="name"
                    placeholder="Nombre"
                />
                <TextInput
                    name="email"
                    placeholder="Email"
                />
                <TextInput
                    name="github"
                    placeholder="Usuario Github"
                />

                <div className="flex flex-col" >
                    <Button

                        variant="primary"
                        type="submit"
                        className=" flex mt-8 mb-5 bg-sky-700 text-white rounded-md w-3/12 min-w-min items-center justify-center"
                    >
                        Crear Usuario
                    </Button>
                    <div>
                        {result === "ok" && (
                            <Badge color='green'>Guardado correctamente</Badge>
                        )}
                        {result === "ko" && <Badge color='red'>Error con los campos</Badge>}
                    </div>
                </div>
            </form>
        </Card>
    )
}

export default CreateNewUser