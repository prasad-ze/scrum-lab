/**
 * Shield system for Star Trek game
 * Manages shield status, energy transfer, and damage handling
 */

const MAX_SHIELD_STRENGTH = 10000;
const MIN_SHIELD_STRENGTH = 0;
const DEFAULT_SHIP_ENERGY = 50000;

export interface ShieldStatus {
  isUp: boolean;
  strength: number;
  maxStrength: number;
  shipEnergy: number;
}

export class Shield {
  private up: boolean;
  private strength: number;
  private shipEnergy: number;

  constructor(initialShipEnergy: number = DEFAULT_SHIP_ENERGY) {
    this.up = false;
    this.strength = 0;
    this.shipEnergy = initialShipEnergy;
  }

  /**
   * Raises the energy shield
   */
  shieldUp(): void {
    this.up = true;
  }

  /**
   * Lowers the energy shield
   */
  shieldDown(): void {
    this.up = false;
  }

  /**
   * Checks if shield is currently raised
   */
  isUp(): boolean {
    return this.up;
  }

  /**
   * Gets current shield strength
   */
  getStrength(): number {
    return this.strength;
  }

  /**
   * Gets current ship energy reserves
   */
  getShipEnergy(): number {
    return this.shipEnergy;
  }

  /**
   * Transfers energy from ship reserves to shield
   * @param amount - Amount of energy to transfer
   */
  shieldTransfer(amount: number): void {
    // Validate transfer amount
    if (amount <= 0) {
      return;
    }

    // Check if sufficient ship energy
    if (amount > this.shipEnergy) {
      return;
    }

    // Calculate new shield strength
    const newStrength = this.strength + amount;

    // Cap at maximum shield strength
    if (newStrength > MAX_SHIELD_STRENGTH) {
      const actualTransfer = MAX_SHIELD_STRENGTH - this.strength;
      this.shipEnergy -= actualTransfer;
      this.strength = MAX_SHIELD_STRENGTH;
    } else {
      this.shipEnergy -= amount;
      this.strength = newStrength;
    }
  }

  /**
   * Reduces shield strength when taking damage
   * @param damage - Amount of damage to apply
   */
  takeDamage(damage: number): void {
    this.strength = Math.max(MIN_SHIELD_STRENGTH, this.strength - damage);
  }

  /**
   * Gets complete shield status
   */
  getStatus(): ShieldStatus {
    return {
      isUp: this.up,
      strength: this.strength,
      maxStrength: MAX_SHIELD_STRENGTH,
      shipEnergy: this.shipEnergy
    };
  }
}

