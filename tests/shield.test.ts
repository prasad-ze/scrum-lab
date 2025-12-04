import { describe, it, expect, beforeEach } from 'vitest';
import { Shield } from '../src/shield';

describe('Shield System', () => {
  let shield: Shield;

  beforeEach(() => {
    shield = new Shield();
  });

  describe('Shield initialization', () => {
    it('should start with shield down and strength at 0', () => {
      expect(shield.isUp()).toBe(false);
      expect(shield.getStrength()).toBe(0);
    });

    it('should start with ship energy reserves at default value', () => {
      expect(shield.getShipEnergy()).toBeGreaterThan(0);
    });
  });

  describe('Shield up command', () => { //
    it('should raise the shield when "shield up" is called', () => {
      shield.shieldUp();
      expect(shield.isUp()).toBe(true);
    });

    it('should keep shield up if already raised', () => {
      shield.shieldUp();
      shield.shieldUp();
      expect(shield.isUp()).toBe(true);
    });
  });

  describe('Shield down command', () => { //
    it('should lower the shield', () => {
      shield.shieldUp();
      shield.shieldDown();
      expect(shield.isUp()).toBe(false);
    });

    it('should keep shield down if already lowered', () => {
      shield.shieldDown();
      expect(shield.isUp()).toBe(false);
    });
  });

  describe('Shield transfer command', () => { //
    it('should transfer energy from ship to shield', () => {
      const initialShipEnergy = shield.getShipEnergy();
      const transferAmount = 100;
      
      shield.shieldTransfer(transferAmount);
      
      expect(shield.getStrength()).toBe(transferAmount);
      expect(shield.getShipEnergy()).toBe(initialShipEnergy - transferAmount);
    });

    it('should accumulate multiple transfers', () => {
      shield.shieldTransfer(100);
      shield.shieldTransfer(200);
      
      expect(shield.getStrength()).toBe(300);
    });

    it('should not allow negative transfer amounts', () => {
      const initialShipEnergy = shield.getShipEnergy();
      const initialShieldStrength = shield.getStrength();
      
      shield.shieldTransfer(-100);
      
      expect(shield.getStrength()).toBe(initialShieldStrength);
      expect(shield.getShipEnergy()).toBe(initialShipEnergy);
    });

    it('should not allow transfer if insufficient ship energy', () => {
      const shipEnergy = shield.getShipEnergy();
      
      shield.shieldTransfer(shipEnergy + 1000);
      
      expect(shield.getStrength()).toBe(0);
      expect(shield.getShipEnergy()).toBe(shipEnergy);
    });
  });

  describe('Shield strength constraints', () => {
    it('should not allow shield strength below 0', () => {
      shield.shieldTransfer(100);
      shield.shieldTransfer(-200); // Try to go negative
      
      expect(shield.getStrength()).toBeGreaterThanOrEqual(0);
    });

    it('should not allow shield strength above 10,000', () => {
      shield.shieldTransfer(15000);
      
      expect(shield.getStrength()).toBeLessThanOrEqual(10000);
    });

    it('should cap at exactly 10,000 when attempting to exceed maximum', () => {
      shield.shieldTransfer(5000);
      shield.shieldTransfer(8000); // Total would be 13,000
      
      expect(shield.getStrength()).toBe(10000);
    });

    it('should maintain minimum of 0', () => {
      expect(shield.getStrength()).toBe(0);
      shield.shieldTransfer(0);
      expect(shield.getStrength()).toBe(0);
    });
  });

  describe('Shield damage', () => {
    it('should reduce shield strength when taking damage', () => {
      shield.shieldTransfer(1000);
      shield.takeDamage(300);
      
      expect(shield.getStrength()).toBe(700);
    });

    it('should not go below 0 when taking excessive damage', () => {
      shield.shieldTransfer(500);
      shield.takeDamage(1000);
      
      expect(shield.getStrength()).toBe(0);
    });
  });

  describe('Shield status', () => {
    it('should return complete shield status', () => {
      shield.shieldUp();
      shield.shieldTransfer(2500);
      
      const status = shield.getStatus();
      
      expect(status).toEqual({
        isUp: true,
        strength: 2500,
        maxStrength: 10000,
        shipEnergy: expect.any(Number)
      });
    });
  });
});
