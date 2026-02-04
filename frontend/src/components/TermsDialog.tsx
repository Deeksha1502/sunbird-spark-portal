import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { ScrollArea } from "@/components/scroll-area";
import sunbirdLogo from "@/assets/sunbird-logo.svg";

interface TermsDialogProps {
    open: boolean;
    onAccept: () => void;
}

const TermsDialog = ({ open, onAccept }: TermsDialogProps) => {
    const [agreed, setAgreed] = useState(false);
    const [activeTab, setActiveTab] = useState("terms");

    const handleContinue = () => {
        if (agreed) {
            onAccept();
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent className="max-w-3xl max-h-[90vh] p-0 bg-card border-border overflow-hidden" hideCloseButton>
                <DialogHeader className="p-6 pb-4 bg-muted/30 border-b border-border">
                    <div className="flex flex-col items-center gap-3">
                        <img src={sunbirdLogo} alt="Sunbird" className="h-12 w-auto" />
                        <DialogTitle className="text-xl font-semibold text-foreground">
                            Terms and Policies
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="px-6 pt-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0 overflow-x-auto flex-nowrap">
                            <TabsTrigger
                                value="terms"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-2 text-sm"
                            >
                                Terms of Use
                            </TabsTrigger>
                            <TabsTrigger
                                value="privacy"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-2 text-sm"
                            >
                                Privacy Policy
                            </TabsTrigger>
                            <TabsTrigger
                                value="content"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-2 text-sm"
                            >
                                Content Policy
                            </TabsTrigger>
                            <TabsTrigger
                                value="guidelines"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-2 text-sm"
                            >
                                Guidelines
                            </TabsTrigger>
                        </TabsList>

                        <ScrollArea className="h-[300px] mt-4">
                            <TabsContent value="terms" className="mt-0 p-4 bg-muted/20 rounded-lg border border-border">
                                <h3 className="text-lg font-semibold text-foreground text-center mb-2">Terms of Use</h3>
                                <p className="text-xs text-muted-foreground text-center mb-4">(Last updated on 29-10-2024)</p>

                                <div className="space-y-4 text-sm text-foreground/90">
                                    <p>
                                        This website is designed, developed and maintained by Sunbird Ed (together referred to as "Platform").
                                    </p>
                                    <p>
                                        These terms of use, as amended, govern the usage of Sunbird Ed (Digital Infrastructure for Knowledge Sharing)
                                        by its Users (as defined below) ("Terms"). Sunbird Ed is an initiative of the Platform.
                                    </p>
                                    <p>
                                        By using Sunbird Ed, you have accepted and agree to be governed by these Terms, as may be amended from
                                        time to time. The terms "you", "your" hereinafter refer to any User of Sunbird Ed, including Registered Users
                                        (as defined below).
                                    </p>
                                    <p>
                                        If you do not agree to these Terms, you are not entitled to use or access Sunbird Ed. Your continued use
                                        of the Platform will be deemed to be your acceptance of the amended Terms.
                                    </p>
                                    <p>
                                        Sunbird Ed reserves the right to change, modify, add, or remove portions of these Terms at any time.
                                        Please check these Terms periodically for changes.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="privacy" className="mt-0 p-4 bg-muted/20 rounded-lg border border-border">
                                <h3 className="text-lg font-semibold text-foreground text-center mb-2">Privacy Policy</h3>
                                <p className="text-xs text-muted-foreground text-center mb-4">(Last updated on 29-10-2024)</p>

                                <div className="space-y-4 text-sm text-foreground/90">
                                    <p>
                                        Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose,
                                        and safeguard your information when you use our platform.
                                    </p>
                                    <p>
                                        We collect information that you provide directly to us, such as when you create an account,
                                        enroll in courses, or contact us for support.
                                    </p>
                                    <p>
                                        We use the information we collect to provide, maintain, and improve our services, to process
                                        transactions and send related information, and to communicate with you.
                                    </p>
                                    <p>
                                        We do not sell, trade, or otherwise transfer your personally identifiable information to
                                        third parties without your consent, except as described in this policy.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="content" className="mt-0 p-4 bg-muted/20 rounded-lg border border-border">
                                <h3 className="text-lg font-semibold text-foreground text-center mb-2">Content Policy</h3>
                                <p className="text-xs text-muted-foreground text-center mb-4">(Last updated on 29-10-2024)</p>

                                <div className="space-y-4 text-sm text-foreground/90">
                                    <p>
                                        All content published on this platform must comply with applicable laws and regulations.
                                        Users are responsible for ensuring that their content does not violate any intellectual property rights.
                                    </p>
                                    <p>
                                        Content that is harmful, offensive, discriminatory, or inappropriate is strictly prohibited.
                                        This includes content that promotes violence, hatred, or illegal activities.
                                    </p>
                                    <p>
                                        The platform reserves the right to remove any content that violates these policies without prior notice.
                                        Repeated violations may result in account suspension or termination.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="guidelines" className="mt-0 p-4 bg-muted/20 rounded-lg border border-border">
                                <h3 className="text-lg font-semibold text-foreground text-center mb-2">Community Guidelines</h3>
                                <p className="text-xs text-muted-foreground text-center mb-4">(Last updated on 29-10-2024)</p>

                                <div className="space-y-4 text-sm text-foreground/90">
                                    <p>
                                        Be respectful and considerate of other users. Engage in constructive discussions and
                                        provide helpful feedback to fellow learners.
                                    </p>
                                    <p>
                                        Do not share personal information of others without their consent. Protect your own
                                        privacy by being mindful of what you share publicly.
                                    </p>
                                    <p>
                                        Report any inappropriate behavior or content to the platform administrators.
                                        Help us maintain a safe and welcoming learning environment for everyone.
                                    </p>
                                </div>
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </div>

                <div className="p-6 pt-4 border-t border-border bg-muted/20">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="terms-agree"
                                checked={agreed}
                                onCheckedChange={(checked) => setAgreed(checked === true)}
                                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <label
                                htmlFor="terms-agree"
                                className="text-sm text-foreground cursor-pointer"
                            >
                                I agree to the updated terms and policies
                            </label>
                        </div>
                        <Button
                            onClick={handleContinue}
                            disabled={!agreed}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TermsDialog;
