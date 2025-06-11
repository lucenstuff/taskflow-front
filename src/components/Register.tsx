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
import { authService } from "@/services/authService";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (password !== password_confirmation) {
        toast.error("Las contraseñas no coinciden.");
        setIsLoading(false);
        return;
      }
      await authService.register({
        firstName: name,
        lastName: lastname,
        email,
        password,
      });
      await authService.login({ email, password });
      toast.success("Registro exitoso. Bienvenido a Task Flow!");
      navigate("/");
    } catch (error) {
      console.error("Error al registrarse:", error);

      let apiMessage =
        "Error al registrarse. Por favor, inténtelo de nuevo más tarde.";

      if (axios.isAxiosError(error)) {
        apiMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          apiMessage;
      } else if (error instanceof Error) {
        apiMessage = error.message || apiMessage;
      }

      toast.error(apiMessage);
    } finally {
      setIsLoading(false);
      setName("");
      setLastname("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background shadow-lg">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Task Flow</CardTitle>
          <CardDescription>Registrarse</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Nombre:
              </label>
              <Input
                id="name"
                type="name"
                placeholder="Juan"
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
                Apellido:
              </label>
              <Input
                id="lastname"
                type="lastname"
                placeholder="Perez"
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
                placeholder="usuario@ejemplo.com"
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
                Contraseña:
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
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
                Repetir Contraseña:
              </label>
              <Input
                id="password_confirmation"
                type="password"
                placeholder="Confirmar Contraseña"
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
  );
}

export default Register;
