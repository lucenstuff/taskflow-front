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
import { toast } from "sonner";
import { authService } from "@/services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      toast.success("Inicio de sesión exitoso. Bienvenido a Task Flow!");
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      let apiMessage =
        "Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.";
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
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background shadow-lg">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Task Flow</CardTitle>
          <CardDescription>Inicia sesión para continuar.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Contraseña:
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="pt-8 flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            <div className="flex flex-col items-center justify-center text-sm text-muted-foreground mt-2">
              <span>
                ¿No tienes una cuenta?{" "}
                <a
                  href="/register"
                  className="text-primary underline hover:text-primary/80 transition-colors font-medium"
                >
                  Regístrate aquí
                </a>
              </span>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
