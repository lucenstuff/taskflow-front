import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Register() {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      console.log("Register attempt", { name, lastname, email, password });
    } catch (error) {
      console.error("Register failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background shadow-lg">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2x1 font-bold">Taxt Flow</CardTitle>
          <CardDescription>Registrarse</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Name:
              </label>
              <Input
                id="name"
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastname"
                className="text-sm font-medium leading-none peer-desabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lastname:
              </label>
              <Input
                id="lastname"
                type="lastname"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-desabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email:
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastname"
                className="text-sm font-medium leading-none peer-desabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password:
              </label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastname"
                className="text-sm font-medium leading-none peer-desabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Repeat Password:
              </label>
              <Input
                id="password_confirmation"
                type="password_confirmation"
                placeholder="password_confirmation"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="pt-8">
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resgistrando..." : "Registrarse"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Register;
