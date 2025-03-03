
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mandateTemplates, userConfiguredMandates } from "@/lib/mandate-templates";
import { ConfiguredMandate, MandateTemplate as MandateTemplateType } from "@/lib/types";
import { MandateTemplateCard } from "@/components/MandateTemplateCard";
import { ConfiguredMandateCard } from "@/components/ConfiguredMandateCard";
import { MandateConfiguration } from "@/components/MandateConfiguration";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function MandateTemplatePage() {
  const [selectedMandate, setSelectedMandate] = useState<MandateTemplateType | null>(null);
  const [configuredMandates, setConfiguredMandates] = useState<ConfiguredMandate[]>(userConfiguredMandates);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all-templates");

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
                <Button 
                  onClick={() => setActiveTab("all-templates")} 
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Configure New Mandate
                </Button>
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
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("all-templates")}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add New Mandate
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
