import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, HelpCircle, FileText, Shield } from "lucide-react";

const ServiceHub = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Service Hub</h1>
        <p className="text-lg text-muted-foreground">
          We're here to help! Find answers and get support
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Call Us</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Mon-Fri, 9AM-6PM
          </p>
          <p className="font-semibold text-primary">+977 01-XXXXXXX</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We'll respond within 24 hours
          </p>
          <p className="font-semibold text-primary">support@shoppingghar.com</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Chat with our team
          </p>
          <Button variant="default">Start Chat</Button>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="p-6">
          <HelpCircle className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">FAQs</h3>
          <p className="text-muted-foreground mb-4">
            Find quick answers to common questions
          </p>
          <Button variant="outline">View FAQs</Button>
        </Card>

        <Card className="p-6">
          <FileText className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Seller Guide</h3>
          <p className="text-muted-foreground mb-4">
            Learn how to start selling on our platform
          </p>
          <Button variant="outline">Read Guide</Button>
        </Card>

        <Card className="p-6">
          <Shield className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Buyer Protection</h3>
          <p className="text-muted-foreground mb-4">
            Your purchases are protected
          </p>
          <Button variant="outline">Learn More</Button>
        </Card>

        <Card className="p-6">
          <MessageCircle className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Report an Issue</h3>
          <p className="text-muted-foreground mb-4">
            Have a problem? Let us know
          </p>
          <Button variant="outline">Submit Report</Button>
        </Card>
      </div>
    </div>
  );
};

export default ServiceHub;
