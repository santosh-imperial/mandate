import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mandateTemplates, userConfiguredMandates } from "@/lib/mandate-templates";
import { ConfiguredMandate, CustomMandateConfig, MandateTemplate as MandateTemplateType } from "@/lib/types";
import { MandateTemplateCard } from "@/components/MandateTemplateCard";
import { ConfiguredMandateCard } from "@/components/ConfiguredMandateCard";
import { MandateConfiguration } from "@/components/MandateConfiguration";
import { CustomMandateCreation } from "@/components/CustomMandateCreation";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MandateTemplatePage() {
  const [selectedMandate, setSelectedMandate] = useState<MandateTemplateType | null>(null);
  const [configuredMandates, setConfiguredMandates] = useState<ConfiguredMandate[]>(userConfiguredMandates);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all-templates");
  const [isCustomCreation, setIsCustomCreation] = useState(false);

  const filteredTemplates = mandateTemplates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMandate = (mandate: ConfiguredMandate) => {
    setConfiguredMandates([...configuredMandates, mandate]);
    setSelectedMandate(null);
    setActiveTab("my-mandates");
    toast.success(`${mandate.name} mandate has been configured successfully`);
  };

  const handleAddCustomMandate = (customConfig: CustomMandateConfig) => {
    const newMandate: ConfiguredMandate = {
      id: customConfig.id,
      name: customConfig.name,
      description: customConfig.description,
      type: customConfig.type,
      icon: customConfig.icon,
      isActive: customConfig.isActive,
      frequency: 'daily',
      fields: [
        {
          id: uuidv4(),
          name: "userCase",
          type: "text",
          label: "Use Case",
          required: true,
          value: customConfig.userCase
        },
        {
          id: uuidv4(),
          name: "model",
          type: "text",
          label: "AI Model",
          required: true,
          value: customConfig.intelligence.model
        },
        ...customConfig.preferences.map(pref => ({
          id: uuidv4(),
          name: `preference_${uuidv4()}`,
          type: "text" as const,
          label: "Preference",
          required: false,
          value: pref
        }))
      ]
    };
    
    setConfiguredMandates([...configuredMandates, newMandate]);
    setIsCustomCreation(false);
    setActiveTab("my-mandates");
    toast.success(`${customConfig.name} mandate has been created successfully`);
  };

  const handleDeleteMandate = (id: string) => {
    setConfiguredMandates(configuredMandates.filter(mandate => mandate.id !== id));
    toast.success("Mandate has been deleted");
  };

  const handleUpdateMandate = (updatedMandate: ConfiguredMandate) => {
    setConfiguredMandates(
      configuredMandates.map(mandate => 
        mandate.id === updatedMandate.id ? updatedMandate : mandate
      )
    );
    toast.success(`${updatedMandate.name} mandate has been updated`);
  };

  const handleToggleMandateStatus = (id: string) => {
    setConfiguredMandates(
      configuredMandates.map(mandate => {
        if (mandate.id === id) {
          const updated = { ...mandate, isActive: !mandate.isActive };
          toast.success(`${mandate.name} ${updated.isActive ? 'activated' : 'deactivated'}`);
          return updated;
        }
        return mandate;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 max-w-6xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Mandate Templates</h1>
            <p className="text-muted-foreground mt-1">
              Configure AI agents to automate your tasks and boost productivity
            </p>
          </header>

          {selectedMandate ? (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedMandate(null)} 
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to templates
              </Button>
              <MandateConfiguration 
                template={selectedMandate} 
                onSave={handleAddMandate}
                onCancel={() => setSelectedMandate(null)}
                existingMandates={configuredMandates}
              />
            </div>
          ) : isCustomCreation ? (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setIsCustomCreation(false)} 
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to templates
              </Button>
              <CustomMandateCreation 
                onSave={handleAddCustomMandate}
                onCancel={() => setIsCustomCreation(false)}
              />
            </div>
          ) : (
            <Tabs 
              defaultValue="all-templates" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-6">
                <TabsTrigger value="all-templates">All Templates</TabsTrigger>
                <TabsTrigger value="my-mandates">
                  My Mandates
                  <Badge variant="secondary" className="ml-2">
                    {configuredMandates.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="custom-mandate">
                  Create Custom
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-templates">
                <div className="mb-6">
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map(template => (
                    <MandateTemplateCard
                      key={template.id}
                      template={template}
                      onClick={() => setSelectedMandate(template)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="my-mandates">
                {configuredMandates.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No configured mandates</h3>
                    <p className="text-muted-foreground mb-6">
                      Configure your first mandate to automate tasks
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button 
                        onClick={() => setActiveTab("all-templates")} 
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Use Template
                      </Button>
                      <Button 
                        onClick={() => setActiveTab("custom-mandate")} 
                        variant="outline"
                        className="gap-2"
                      >
                        <Wand2 className="h-4 w-4" />
                        Create Custom
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {configuredMandates.map(mandate => (
                      <ConfiguredMandateCard
                        key={mandate.id}
                        mandate={mandate}
                        onToggleStatus={handleToggleMandateStatus}
                        onDelete={handleDeleteMandate}
                        onEdit={handleUpdateMandate}
                      />
                    ))}
                    <div className="flex items-center justify-center border border-dashed border-border rounded-lg p-8 h-full">
                      <div className="flex flex-col space-y-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab("all-templates")}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add From Template
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab("custom-mandate")}
                          className="gap-2"
                        >
                          <Wand2 className="h-4 w-4" />
                          Create Custom Mandate
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="custom-mandate">
                <div className="flex justify-center">
                  <Button 
                    className="gap-2 mb-6"
                    onClick={() => setIsCustomCreation(true)}
                  >
                    <Wand2 className="h-4 w-4" />
                    Create a Custom Mandate
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Build Your Own Mandate</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    Create a fully customized AI agent tailored to your exact needs. Define everything from the 
                    AI model used to the tools it can access, memory capabilities, and custom preferences.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setIsCustomCreation(true)}
                    className="gap-2"
                  >
                    <Wand2 className="h-5 w-5" />
                    Start Creating
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
