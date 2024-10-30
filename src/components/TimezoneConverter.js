'use client';
import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const TimezoneConverter = () => {
  const [inputTime, setInputTime] = useState('12:00');
  const [use24Hour, setUse24Hour] = useState(false);
  const [sourceTimezone, setSourceTimezone] = useState('GMT');
  
  const timeZones = {
    'GMT': { offset: 0, city: 'London' },
    'America/New_York': { offset: -4, city: 'New York' },
    'America/Chicago': { offset: -5, city: 'Chicago' },
    'America/Denver': { offset: -6, city: 'Denver' },
    'America/Los_Angeles': { offset: -7, city: 'Los Angeles' },
    'Europe/Paris': { offset: +2, city: 'Paris' },
    'Asia/Tokyo': { offset: +9, city: 'Tokyo' },
    'Asia/Dubai': { offset: +4, city: 'Dubai' },
    'Australia/Sydney': { offset: +10, city: 'Sydney' },
    'Pacific/Auckland': { offset: +12, city: 'Auckland' }
  };

  const targetLocations = [
    {
      name: 'Spruce Pine, NC',
      timezone: 'America/New_York',
      gmtOffset: -4,
      isDST: true
    },
    {
      name: 'Minneapolis, MN',
      timezone: 'America/Chicago',
      gmtOffset: -5,
      isDST: true
    },
    {
      name: 'Melbourne, Victoria',
      timezone: 'Australia/Melbourne',
      gmtOffset: +10,
      isDST: false
    },
    {
      name: 'London, England',
      timezone: 'Europe/London',
      gmtOffset: +1,
      isDST: true
    }
  ];

  const convertTime = (time, targetOffset, sourceOffset = timeZones[sourceTimezone].offset) => {
    const [hours, minutes] = time.split(':').map(Number);
    let convertedHours = (hours - sourceOffset + targetOffset + 24) % 24;
    
    if (!use24Hour) {
      const period = convertedHours >= 12 ? 'PM' : 'AM';
      convertedHours = convertedHours % 12 || 12;
      return `${convertedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    
    return `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const sortedLocations = [...targetLocations].sort((a, b) => {
    if (a.timezone === sourceTimezone) return -1;
    if (b.timezone === sourceTimezone) return 1;
    return 0;
  });

  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Time Zone Converter</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">24-hour</span>
            <button
              onClick={() => setUse24Hour(!use24Hour)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                use24Hour ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  use24Hour ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone:</label>
            <select
              value={sourceTimezone}
              onChange={(e) => setSourceTimezone(e.target.value)}
              className="w-full max-w-xs p-2 border rounded-md bg-white"
            >
              {Object.entries(timeZones).map(([zone, { city }]) => (
                <option key={zone} value={zone}>
                  {zone.replace('_', ' ')} ({city})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Time:</label>
            <input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="w-full max-w-xs p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="space-y-4">
          {!targetLocations.some(loc => loc.timezone === sourceTimezone) && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {timeZones[sourceTimezone].city} (Source)
                  </h3>
                  <p className="text-sm text-gray-600">
                    GMT{timeZones[sourceTimezone].offset >= 0 ? '+' : ''}
                    {timeZones[sourceTimezone].offset}
                  </p>
                </div>
                <div className="text-xl font-mono">
                  {convertTime(inputTime, timeZones[sourceTimezone].offset, timeZones[sourceTimezone].offset)}
                </div>
              </div>
            </div>
          )}

          {sortedLocations.map((location) => (
            <div 
              key={location.name} 
              className={`p-4 rounded-lg ${
                location.timezone === sourceTimezone 
                  ? 'bg-blue-50' 
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {location.name}
                    {location.timezone === sourceTimezone && " (Source)"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    GMT{location.gmtOffset >= 0 ? '+' : ''}{location.gmtOffset}
                    {location.isDST && ' (DST active)'}
                  </p>
                </div>
                <div className="text-xl font-mono">
                  {convertTime(inputTime, location.gmtOffset)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimezoneConverter;