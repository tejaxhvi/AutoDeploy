import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ ...props }) {
  // Step 1: State to hold form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2: State to show feedback to the user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step 3: Handle form submission
  async function handleSubmit(e) {
    e.preventDefault(); // prevent page reload (default browser behavior)
    setError("");
    setSuccess("");

    // Frontend validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Step 4: Send data to the backend using fetch
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // tell backend we're sending JSON
        },
        body: JSON.stringify({ name, email, password }), // convert JS object to JSON string
      });

      const data = await response.json(); // parse the JSON response from backend

      if (!response.ok) {
        // If server returned an error (4xx/5xx), show the message
        setError(data.message);
      } else {
        // Success!
        setSuccess(data.message);
      }
    } catch (err) {
      // This runs if the backend is unreachable (server down, wrong URL, etc.)
      setError("Could not connect to server. Is the backend running?", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 5: Attach onSubmit to the form */}
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                </Field>

                {/* Step 6: Show error or success messages */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <FieldGroup>
                  <Field>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                    <Button variant="outline" type="button">
                      Sign up with Google
                    </Button>
                    <FieldDescription className="px-6 text-center">
                      Already have an account? <a href="/login">Log In</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
