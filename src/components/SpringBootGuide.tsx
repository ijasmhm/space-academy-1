import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Globe, Container } from "lucide-react";

const SpringBootGuide = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground">Spring Boot Backend Implementation Guide</h1>
        <p className="text-xl text-muted-foreground">Complete setup instructions for your university course management backend</p>
      </div>

      <div className="grid gap-8">
        {/* Project Structure */}
        <Card className="university-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-6 w-6 mr-2 text-primary" />
              Project Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`courseflow-backend/
├── src/main/java/com/university/courseflow/
│   ├── CourseflowApplication.java
│   ├── controller/
│   │   ├── CourseController.java
│   │   ├── StudentController.java
│   │   └── ResultController.java
│   ├── entity/
│   │   ├── Course.java
│   │   ├── Student.java
│   │   └── Result.java
│   ├── repository/
│   │   ├── CourseRepository.java
│   │   ├── StudentRepository.java
│   │   └── ResultRepository.java
│   └── config/
│       └── CorsConfig.java
├── src/main/resources/
│   ├── application.yml
│   └── data.sql (optional)
└── pom.xml`}
            </pre>
          </CardContent>
        </Card>

        {/* Entity Classes */}
        <Card className="university-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-6 w-6 mr-2 text-primary" />
              Entity Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Course.java</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String code;
    
    @Column(nullable = false)
    private String title;
    
    // Constructors, getters, setters
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Student.java</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    // Constructors, getters, setters
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Result.java</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`@Entity
@Table(name = "results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Column(nullable = false)
    private String grade;
    
    // Constructors, getters, setters
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* REST Controllers */}
        <Card className="university-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-6 w-6 mr-2 text-primary" />
              REST API Controllers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">CourseController.java</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }
    
    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
        course.setId(id);
        return courseRepository.save(course);
    }
    
    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
    }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card className="university-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-6 w-6 mr-2 text-primary" />
              Configuration Files
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">application.yml</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`# H2 Database Configuration (Default)
spring:
  datasource:
    url: jdbc:h2:mem:courseflow
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
    show-sql: true
  h2:
    console:
      enabled: true

# MySQL Configuration (Production)
# spring:
#   datasource:
#     url: jdbc:mysql://localhost:3306/courseflow
#     username: root
#     password: yourpassword
#   jpa:
#     hibernate:
#       ddl-auto: update
#     database-platform: org.hibernate.dialect.MySQL8Dialect

server:
  port: 8080`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">CorsConfig.java</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Docker Configuration */}
        <Card className="university-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Container className="h-6 w-6 mr-2 text-primary" />
              Docker Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Backend Dockerfile</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/courseflow-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Frontend Dockerfile</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">docker-compose.yml</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`version: '3.8'
services:
  backend:
    build: ./courseflow-backend
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    depends_on:
      - database

  frontend:
    build: ./courseflow-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  database:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=courseflow
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Dependencies */}
        <Card className="university-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-6 w-6 mr-2 text-primary" />
              Maven Dependencies (pom.xml)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>`}
            </pre>
          </CardContent>
        </Card>

        {/* Running Instructions */}
        <Card className="university-card">
          <CardHeader>
            <CardTitle>Running the Application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Local Development</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm"><strong>Backend:</strong></p>
                <code className="block bg-background p-2 rounded text-sm">mvn spring-boot:run</code>
                <p className="text-sm mt-4"><strong>Frontend:</strong></p>
                <code className="block bg-background p-2 rounded text-sm">npm run dev</code>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Docker</h3>
              <div className="bg-muted p-4 rounded-lg">
                <code className="block bg-background p-2 rounded text-sm">docker-compose up --build</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpringBootGuide;