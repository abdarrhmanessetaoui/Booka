'use client';

import React from 'react';
import { voiceCategories, voiceOptions } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { VoiceSelectorProps } from '@/types';

const VoiceSelector = ({ value, onChange, disabled, className }: VoiceSelectorProps) => {
    return (
        <div className={cn('space-y-6', className)}>
            <RadioGroup
                value={value}
                onValueChange={onChange}
                disabled={disabled}
                className="space-y-8"
            >
                {/* Male Voices */}
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-[#777]">Male Voices</h4>
                    <div className="voice-selector-options">
                        {voiceCategories.male.map((voiceId) => {
                            const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
                            const isSelected = value === voiceId;
                            return (
                                <Label
                                    key={voiceId}
                                    className={cn(
                                        'voice-selector-option',
                                        isSelected ? 'voice-selector-option-selected' : 'voice-selector-option-default',
                                        disabled && 'voice-selector-option-disabled'
                                    )}
                                >
                                    <RadioGroupItem value={voiceId} id={voiceId} className="sr-only" />
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border flex items-center justify-center",
                                                isSelected ? "border-[#663820]" : "border-gray-300"
                                            )}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-[#663820]" />}
                                            </div>
                                            <span className="font-bold text-[#212a3b]">{voice.name}</span>
                                        </div>
                                        <p className="text-xs text-[#777] leading-relaxed">
                                            {voice.description}
                                        </p>
                                    </div>
                                </Label>
                            );
                        })}
                    </div>
                </div>

                {/* Female Voices */}
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-[#777]">Female Voices</h4>
                    <div className="voice-selector-options">
                        {voiceCategories.female.map((voiceId) => {
                            const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
                            const isSelected = value === voiceId;
                            return (
                                <Label
                                    key={voiceId}
                                    className={cn(
                                        'voice-selector-option',
                                        isSelected ? 'voice-selector-option-selected' : 'voice-selector-option-default',
                                        disabled && 'voice-selector-option-disabled'
                                    )}
                                >
                                    <RadioGroupItem value={voiceId} id={voiceId} className="sr-only" />
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border flex items-center justify-center",
                                                isSelected ? "border-[#663820]" : "border-gray-300"
                                            )}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-[#663820]" />}
                                            </div>
                                            <span className="font-bold text-[#212a3b]">{voice.name}</span>
                                        </div>
                                        <p className="text-xs text-[#777] leading-relaxed">
                                            {voice.description}
                                        </p>
                                    </div>
                                </Label>
                            );
                        })}
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
};

export default VoiceSelector;
