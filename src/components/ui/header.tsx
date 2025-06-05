import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="absolute w-full p-4">
      <Container className="mx-auto flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top:
                      document.getElementById("freelance-work")?.offsetTop || 0,
                    behavior: "smooth",
                  });
                }}
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top:
                      document.getElementById("pet-projects")?.offsetTop || 0,
                    behavior: "smooth",
                  });
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="/Resumes/Ly-Tuan-Minh-Resume-04-06-2025.pdf"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
