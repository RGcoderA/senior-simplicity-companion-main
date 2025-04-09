
import React from 'react';
import { Watch, Activity, Heart, Compass, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHealthDeviceStatus, useConnectHealthDevice, useDisconnectHealthDevice, useHealthData } from '@/services/healthDeviceService';
import { toast } from 'sonner';

const HealthDeviceConnect = () => {
  const { data: deviceStatus } = useHealthDeviceStatus();
  const { data: healthData } = useHealthData();
  const { mutate: connectDevice, isPending: isConnecting } = useConnectHealthDevice();
  const { mutate: disconnectDevice, isPending: isDisconnecting } = useDisconnectHealthDevice();

  const handleConnectDevice = () => {
    connectDevice();
  };

  const handleDisconnectDevice = () => {
    disconnectDevice();
  };

  const isConnected = deviceStatus?.connected;

  return (
    <div className="elder-card mb-6">
      <div className="flex items-center mb-6">
        <div className="bg-companion-blue/10 p-3 rounded-full mr-4">
          <Watch size={32} className="text-companion-blue" />
        </div>
        <div>
          <h3 className="text-elder-lg font-semibold text-companion-dark">Health Device</h3>
          <p className="text-elder-base text-gray-600">
            {isConnected 
              ? `Connected to ${deviceStatus?.deviceName}` 
              : "Connect your Apple Watch or health device"}
          </p>
        </div>
      </div>

      {isConnected && healthData ? (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Activity className="text-companion-blue mr-2" size={20} />
                <span className="text-elder-sm text-gray-700">Steps</span>
              </div>
              <p className="text-elder-lg font-semibold text-companion-dark">{healthData.steps.toLocaleString()}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Heart className="text-companion-orange mr-2" size={20} />
                <span className="text-elder-sm text-gray-700">Heart Rate</span>
              </div>
              <p className="text-elder-lg font-semibold text-companion-dark">{healthData.heartRate} bpm</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Compass className="text-companion-blue mr-2" size={20} />
                <span className="text-elder-sm text-gray-700">Active Minutes</span>
              </div>
              <p className="text-elder-lg font-semibold text-companion-dark">{healthData.activeMinutes}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Shield className="text-companion-orange mr-2" size={20} />
                <span className="text-elder-sm text-gray-700">Sleep</span>
              </div>
              <p className="text-elder-lg font-semibold text-companion-dark">{healthData.sleepHours} hrs</p>
            </div>
          </div>
          
          <p className="text-elder-sm text-gray-500 mb-4">
            Last updated: {new Date(healthData.lastUpdated).toLocaleString()}
          </p>
          
          <Button 
            onClick={handleDisconnectDevice}
            className="elder-button w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
            disabled={isDisconnecting}
          >
            {isDisconnecting ? "Disconnecting..." : "Disconnect Device"}
          </Button>
        </div>
      ) : (
        <div>
          <div className="bg-companion-lightBlue p-4 rounded-lg mb-4">
            <p className="text-elder-base text-companion-dark">
              Connect your Apple Watch or other health device to track your daily activity, heart rate, 
              and sleep patterns.
            </p>
          </div>
          
          <Button 
            onClick={handleConnectDevice}
            className="elder-button w-full bg-companion-blue text-white hover:bg-companion-blue/90"
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect Health Device"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HealthDeviceConnect;
