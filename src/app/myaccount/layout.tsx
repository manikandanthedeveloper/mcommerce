import { ReactNode } from 'react';
import Container from '@/components/global/Container';
import Sidebar from '@/components/MyAccount/Sidebar';

const MyAccountLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Container className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content */}
                <main className="lg:col-span-3">
                    {children}
                </main>
            </div>
        </Container>
    );
};

export default MyAccountLayout;
