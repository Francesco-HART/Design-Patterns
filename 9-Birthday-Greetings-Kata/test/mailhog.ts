import { execSync } from "child_process";

export const startMailhog = () => {
  const whichDockerCompose = execSync("which docker-compose").toString();
  if (whichDockerCompose === "") {
    // tslint:disable-next-line:no-console
    console.warn("To run this test you should have docker-compose installed.");
    throw new Error("docker-compose not found");
  }

  try {
    // Check if Docker daemon is running
    execSync("docker info", { stdio: "ignore" });
  } catch (e) {
    throw new Error("Docker daemon is not running. Please start Docker Desktop.");
  }

  try {
    execSync("docker-compose down", { stdio: "ignore" });
  } catch (e) {
    // Ignore errors if containers don't exist
  }
  execSync("docker-compose up -d");
};

export const stopMailHog = () => {
  try {
    execSync("docker-compose down", { stdio: "ignore" });
  } catch (e) {
    // Ignore errors
  }
};

export const messagesSent = async (): Promise<Message[]> =>
  new Promise((resolve) => {
    return setTimeout(async () => {
      const response = await fetch("http://127.0.0.1:8025/api/v1/messages");
      const data = await response.json();
      resolve(data);
    }, 500);
  });

interface Message {
  Content: {
    Body: string;
    Headers: {
      Subject: string[];
      To: string[];
    };
  };
}
