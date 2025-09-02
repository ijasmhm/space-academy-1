import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

const AdmissionCard = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/admission-card.pdf";
    link.download = "admission-card.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="university-card">
      <CardHeader>
        <CardTitle>Exam Admission Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Download your exam admission card in PDF format.</p>
        <Button onClick={handleDownload} className="university-gradient">
          <Download className="mr-2 h-4 w-4" />
          Download Admission Card
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdmissionCard;
