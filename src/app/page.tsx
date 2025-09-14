import { JoinSessionForm } from "@/components/forms/join-session-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateSessionForm } from "@/components/forms/create-session";

export default function Home() {
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <Tabs defaultValue="join" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="join">Присоединиться</TabsTrigger>
                    <TabsTrigger value="create">Создать</TabsTrigger>
                </TabsList>
                <TabsContent value="join">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Присоединиться к сессии
                            </CardTitle>
                            <CardDescription>
                                Введите ключ сессии, чтобы присоединиться
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <JoinSessionForm className="space-y-2" />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="create">
                    <Card>
                        <CardHeader>
                            <CardTitle>Создать сессию</CardTitle>
                            <CardDescription>
                                Нажмите, чтобы создать новую сессию
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CreateSessionForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div >
    )
}
