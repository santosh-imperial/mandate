import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomMandateConfig, AIModel } from "@/lib/types";
import { v4 as uuidv4 } from 'uuid';
import { 
  Brain, 
  User,
  Settings, 
  Key, 
  MemoryStick, 
  Heart, 
  Wrench, // Changed from 'Tool' to 'Wrench'
  Computer, 
  MessageSquare, 
  Book, 
  Upload, 
  Download, 
  Check, 
  Edit 
} from "lucide-react";
import { toast } from "sonner";

// Sample AI models
const availableModels: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Advanced model with strong reasoning capabilities',
    capabilities: ['Text generation', 'Image understanding', 'Code assistance']
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Faster and more efficient version of GPT-4o',
    capabilities: ['Text generation', 'Image understanding', 'Code assistance']
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    description: 'Balanced model with strong reasoning and creativity',
    capabilities: ['Text generation', 'Image understanding', 'Long context']
  }
];

interface CustomMandateCreationProps {
  onSave: (mandate: CustomMandateConfig) => void;
  onCancel: () => void;
}

export const CustomMandateCreation = ({ onSave, onCancel }: CustomMandateCreationProps) => {
  const [activeTab, setActiveTab] = useState("user-case");
  const [mandateConfig, setMandateConfig] = useState<CustomMandateConfig>({
    id: uuidv4(),
    name: '',
    description: '',
    userCase: '',
    intelligence: {
      model: 'gpt-4o',
    },
    conditioning: {
      instructions: '',
      knowledgeBase: {
        enabled: false,
        documents: [],
      },
      finetuning: {
        enabled: false,
        examples: [],
      },
    },
    access: {
      tools: {
        enabled: false,
        connectedApis: [],
      },
      computerAccess: {
        enabled: false,
        permissions: [],
      },
    },
    memory: {
      shortTerm: {
        conversationCount: 10,
      },
      longTermWrite: false,
      longTermRead: false,
    },
    preferences: [],
    type: 'custom',
    icon: 'bot',
    isActive: true,
  });

  const [preference, setPreference] = useState("");
  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");

  const handleChange = (section: string, field: string, value: any) => {
    setMandateConfig((prev) => {
      const updated = { ...prev };
      if (section === 'root') {
        (updated as any)[field] = value;
      } else if (section.includes('.')) {
        const [mainSection, subSection] = section.split('.');
        (updated as any)[mainSection][subSection] = value;
      } else {
        (updated as any)[section][field] = value;
      }
      return updated;
    });
  };

  const addPreference = () => {
    if (preference.trim()) {
      setMandateConfig((prev) => ({
        ...prev,
        preferences: [...prev.preferences, preference],
      }));
      setPreference("");
    }
  };

  const removePreference = (index: number) => {
    setMandateConfig((prev) => ({
      ...prev,
      preferences: prev.preferences.filter((_, i) => i !== index),
    }));
  };

  const addExample = () => {
    if (exampleInput.trim() && exampleOutput.trim()) {
      setMandateConfig((prev) => ({
        ...prev,
        conditioning: {
          ...prev.conditioning,
          finetuning: {
            ...prev.conditioning.finetuning,
            examples: [
              ...prev.conditioning.finetuning.examples,
              { input: exampleInput, output: exampleOutput },
            ],
          },
        },
      }));
      setExampleInput("");
      setExampleOutput("");
    }
  };

  const removeExample = (index: number) => {
    setMandateConfig((prev) => ({
      ...prev,
      conditioning: {
        ...prev.conditioning,
        finetuning: {
          ...prev.conditioning.finetuning,
          examples: prev.conditioning.finetuning.examples.filter((_, i) => i !== index),
        },
      },
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!mandateConfig.name.trim()) {
      toast.error("Please provide a name for your mandate");
      return;
    }

    if (!mandateConfig.userCase.trim()) {
      toast.error("Please describe what you expect this mandate to do");
      return;
    }

    onSave(mandateConfig);
    toast.success("Custom mandate created successfully");
  };

  const nextTab = () => {
    const tabs = ["user-case", "intelligence", "conditioning", "access", "memory", "preferences"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const prevTab = () => {
    const tabs = ["user-case", "intelligence", "conditioning", "access", "memory", "preferences"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Custom Mandate</CardTitle>
        <CardDescription>
          Configure an AI agent to automate tasks according to your specific needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="user-case" className="flex flex-col items-center gap-1 py-2">
              <User className="h-4 w-4" />
              <span className="text-xs">Use Case</span>
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="flex flex-col items-center gap-1 py-2">
              <Brain className="h-4 w-4" />
              <span className="text-xs">Intelligence</span>
            </TabsTrigger>
            <TabsTrigger value="conditioning" className="flex flex-col items-center gap-1 py-2">
              <Settings className="h-4 w-4" />
              <span className="text-xs">Conditioning</span>
            </TabsTrigger>
            <TabsTrigger value="access" className="flex flex-col items-center gap-1 py-2">
              <Key className="h-4 w-4" />
              <span className="text-xs">Access</span>
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex flex-col items-center gap-1 py-2">
              <MemoryStick className="h-4 w-4" />
              <span className="text-xs">Memory</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex flex-col items-center gap-1 py-2">
              <Heart className="h-4 w-4" />
              <span className="text-xs">Preferences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user-case" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="mandate-name">Mandate Name</Label>
                <Input
                  id="mandate-name"
                  value={mandateConfig.name}
                  onChange={(e) => handleChange('root', 'name', e.target.value)}
                  placeholder="Give your mandate a name (e.g., Daily Travel Planner)"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="mandate-description">Brief Description</Label>
                <Input
                  id="mandate-description"
                  value={mandateConfig.description}
                  onChange={(e) => handleChange('root', 'description', e.target.value)}
                  placeholder="A short description of what this mandate does"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="user-case">What do you expect this mandate to do?</Label>
                <Textarea
                  id="user-case"
                  value={mandateConfig.userCase}
                  onChange={(e) => handleChange('root', 'userCase', e.target.value)}
                  placeholder="Describe in detail what tasks you want this AI agent to handle for you"
                  className="mt-1 min-h-32"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-4">
            <div className="space-y-4">
              <Label>Select AI Model</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableModels.map((model) => (
                  <Card 
                    key={model.id}
                    className={`cursor-pointer transition-all ${
                      mandateConfig.intelligence.model === model.id 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleChange('intelligence', 'model', model.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        {model.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-sm text-muted-foreground mb-2">{model.description}</p>
                      <div className="text-xs space-y-1">
                        {model.capabilities.map((capability, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <Check className="h-3 w-3 text-primary" />
                            <span>{capability}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conditioning" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="conditioning-instructions">Instructions</Label>
              <Textarea
                id="conditioning-instructions"
                value={mandateConfig.conditioning.instructions}
                onChange={(e) => handleChange('conditioning', 'instructions', e.target.value)}
                placeholder="Provide specific instructions on how the AI should approach tasks and format responses"
                className="mt-1 min-h-24"
              />
            </div>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Knowledge Base</h3>
                    <p className="text-sm text-muted-foreground">Upload documents as knowledge sources</p>
                  </div>
                </div>
                <Switch
                  checked={mandateConfig.conditioning.knowledgeBase.enabled}
                  onCheckedChange={(checked) => 
                    handleChange('conditioning.knowledgeBase', 'enabled', checked)
                  }
                />
              </div>
              {mandateConfig.conditioning.knowledgeBase.enabled && (
                <div className="pl-7 mt-2">
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                  {mandateConfig.conditioning.knowledgeBase.documents.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {mandateConfig.conditioning.knowledgeBase.documents.map((doc, idx) => (
                        <div key={idx} className="text-sm flex items-center gap-2">
                          <span>{doc}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Fine-tuning</h3>
                    <p className="text-sm text-muted-foreground">Provide examples to fine-tune the AI responses</p>
                  </div>
                </div>
                <Switch
                  checked={mandateConfig.conditioning.finetuning.enabled}
                  onCheckedChange={(checked) => 
                    handleChange('conditioning.finetuning', 'enabled', checked)
                  }
                />
              </div>
              {mandateConfig.conditioning.finetuning.enabled && (
                <div className="pl-7 mt-2 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="example-input">Example Input</Label>
                    <Textarea
                      id="example-input"
                      value={exampleInput}
                      onChange={(e) => setExampleInput(e.target.value)}
                      placeholder="What the user might ask"
                      className="min-h-20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="example-output">Example Output</Label>
                    <Textarea
                      id="example-output"
                      value={exampleOutput}
                      onChange={(e) => setExampleOutput(e.target.value)}
                      placeholder="How you want the AI to respond"
                      className="min-h-20"
                    />
                  </div>
                  <Button type="button" onClick={addExample}>Add Example</Button>
                  
                  {mandateConfig.conditioning.finetuning.examples.length > 0 && (
                    <div className="mt-4 space-y-4">
                      <h4 className="text-sm font-medium">Added Examples:</h4>
                      {mandateConfig.conditioning.finetuning.examples.map((example, idx) => (
                        <Card key={idx} className="p-3">
                          <div className="flex justify-between">
                            <h5 className="text-sm font-medium">Example {idx + 1}</h5>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 p-0"
                              onClick={() => removeExample(idx)}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs font-medium text-muted-foreground">Input:</p>
                            <p className="text-sm mt-1">{example.input}</p>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs font-medium text-muted-foreground">Output:</p>
                            <p className="text-sm mt-1">{example.output}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Tools & API Access</h3>
                    <p className="text-sm text-muted-foreground">Connect external tools and APIs</p>
                  </div>
                </div>
                <Switch
                  checked={mandateConfig.access.tools.enabled}
                  onCheckedChange={(checked) => 
                    handleChange('access.tools', 'enabled', checked)
                  }
                />
              </div>
              {mandateConfig.access.tools.enabled && (
                <div className="pl-7 mt-2 space-y-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['Google Calendar', 'Weather API', 'Maps API', 'Email', 'Zapier'].map((api) => (
                      <Button 
                        key={api} 
                        variant="outline" 
                        className={`justify-start ${
                          mandateConfig.access.tools.connectedApis.includes(api) ? 
                          'bg-primary/10 border-primary' : ''
                        }`}
                        onClick={() => {
                          const updatedApis = mandateConfig.access.tools.connectedApis.includes(api)
                            ? mandateConfig.access.tools.connectedApis.filter(a => a !== api)
                            : [...mandateConfig.access.tools.connectedApis, api];
                          handleChange('access.tools', 'connectedApis', updatedApis);
                        }}
                      >
                        {mandateConfig.access.tools.connectedApis.includes(api) && (
                          <Check className="h-4 w-4 mr-2 text-primary" />
                        )}
                        {api}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Computer className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Computer Access</h3>
                    <p className="text-sm text-muted-foreground">Grant access to system capabilities</p>
                  </div>
                </div>
                <Switch
                  checked={mandateConfig.access.computerAccess.enabled}
                  onCheckedChange={(checked) => 
                    handleChange('access.computerAccess', 'enabled', checked)
                  }
                />
              </div>
              {mandateConfig.access.computerAccess.enabled && (
                <div className="pl-7 mt-2 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['File System', 'Browser', 'Screen Capture', 'Notifications'].map((perm) => (
                      <Button 
                        key={perm} 
                        variant="outline" 
                        className={`justify-start ${
                          mandateConfig.access.computerAccess.permissions.includes(perm) ? 
                          'bg-primary/10 border-primary' : ''
                        }`}
                        onClick={() => {
                          const updatedPerms = mandateConfig.access.computerAccess.permissions.includes(perm)
                            ? mandateConfig.access.computerAccess.permissions.filter(p => p !== perm)
                            : [...mandateConfig.access.computerAccess.permissions, perm];
                          handleChange('access.computerAccess', 'permissions', updatedPerms);
                        }}
                      >
                        {mandateConfig.access.computerAccess.permissions.includes(perm) && (
                          <Check className="h-4 w-4 mr-2 text-primary" />
                        )}
                        {perm}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="memory" className="space-y-6">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Short-term Memory</h3>
                  <p className="text-sm text-muted-foreground">Control conversation context length</p>
                </div>
              </div>
              <div className="pl-7 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="conversation-count">
                    How many conversations should the AI remember?
                  </Label>
                  <Select
                    value={mandateConfig.memory.shortTerm.conversationCount.toString()}
                    onValueChange={(value) => 
                      handleChange('memory.shortTerm', 'conversationCount', parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select number of conversations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 conversations</SelectItem>
                      <SelectItem value="10">10 conversations</SelectItem>
                      <SelectItem value="20">20 conversations</SelectItem>
                      <SelectItem value="50">50 conversations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Long-term Memory</h3>
                    <p className="text-sm text-muted-foreground">Enable persistent memory capabilities</p>
                  </div>
                </div>
              </div>
              <div className="pl-7 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="long-term-write" className="flex items-center gap-2">
                    <span>Write to long-term memory</span>
                    <span className="text-sm text-muted-foreground">(Other mandates can learn from this)</span>
                  </Label>
                  <Switch
                    id="long-term-write"
                    checked={mandateConfig.memory.longTermWrite}
                    onCheckedChange={(checked) => 
                      handleChange('memory', 'longTermWrite', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="long-term-read" className="flex items-center gap-2">
                    <span>Read from long-term memory</span>
                    <span className="text-sm text-muted-foreground">(Learn from other mandates)</span>
                  </Label>
                  <Switch
                    id="long-term-read"
                    checked={mandateConfig.memory.longTermRead}
                    onCheckedChange={(checked) => 
                      handleChange('memory', 'longTermRead', checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preference-input">Add Your Preferences</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="preference-input"
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  placeholder="E.g., I prefer morning flights, business class only, etc."
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && addPreference()}
                />
                <Button type="button" onClick={addPreference}>Add</Button>
              </div>
              <p className="text-xs text-muted-foreground">Press Enter or click Add to add a preference</p>
            </div>
            
            {mandateConfig.preferences.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="text-sm font-medium">Your Preferences:</h3>
                <div className="space-y-2">
                  {mandateConfig.preferences.map((pref, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span>{pref}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removePreference(idx)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {activeTab !== "user-case" && (
            <Button variant="outline" onClick={prevTab}>
              Previous
            </Button>
          )}
          {activeTab !== "preferences" ? (
            <Button onClick={nextTab}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSave}>
              Create Mandate
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
