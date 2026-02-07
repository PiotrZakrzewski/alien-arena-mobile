# E2E Test Plan — Alien Arena Mobile

Cross-references implementation against **ALIEN_Combat_Reference.md** rules.
Each section lists test scenarios, expected behavior, and whether the implementation matches the rules or is an intentional simplification.

---

## Legend

- **MATCH** — Implementation matches the ALIEN RPG rules
- **SIMPLIFIED** — Intentional simplification from the rules (acceptable for v1)
- **BUG** — Implementation deviates from rules in a way that should be fixed

---

## 1. Pre-Combat Flow (Character Setup)

### 1.1 Character Selection
| # | Test | Expected | Status |
|---|------|----------|--------|
| 1.1.1 | Select each of 6 career presets | Preset loads with correct stats, name, career | MATCH |
| 1.1.2 | Description text shown on selection screen | Flavor text visible, no stats | MATCH |
| 1.1.3 | Selected character populates playerCharacter slot | Character is deep-copied from preset (mutation-safe) | MATCH |

### 1.2 Stats Editor
| # | Test | Expected | Status |
|---|------|----------|--------|
| 1.2.1 | Increment/decrement STR and AGI | Values change within 1–5 range | MATCH |
| 1.2.2 | Navigate back to character select | Previous phase loads | MATCH |
| 1.2.3 | Navigate forward to skills | Skills phase loads with current stats | MATCH |

### 1.3 Skills Editor
| # | Test | Expected | Status |
|---|------|----------|--------|
| 1.3.1 | Edit each skill (closeCombat, rangedCombat, mobility, stamina) | Values 0–5 | MATCH |
| 1.3.2 | Skill base stat badge shows correct attribute | closeCombat/stamina→STR, rangedCombat/mobility→AGI | MATCH |

### 1.4 Items Editor
| # | Test | Expected | Status |
|---|------|----------|--------|
| 1.4.1 | Switch weapon type (unarmed/close/ranged) | Weapon stats update accordingly | MATCH |
| 1.4.2 | Adjust weapon modifier, damage, range | Values clamp within defined bounds | MATCH |
| 1.4.3 | Toggle armor piercing | AP flag toggles | MATCH |
| 1.4.4 | Set armor rating 0–3 | Rating updates | MATCH |

### 1.5 Talents Editor
| # | Test | Expected | Status |
|---|------|----------|--------|
| 1.5.1 | Only career-appropriate + general talents shown | Marine sees marine+general, kid sees kid+general, etc. | MATCH |
| 1.5.2 | Stackable talents go up to maxStacks (3) | seenItAll, weaponSpecialist allow 1–3 | MATCH |
| 1.5.3 | Non-stackable talents toggle 0/1 | Single-stack talents can't exceed 1 | MATCH |

### 1.6 Combat Setup
| # | Test | Expected | Status |
|---|------|----------|--------|
| 1.6.1 | Select Normal combat type | advantageSide = null | MATCH |
| 1.6.2 | Select Surprise, pick advantage side | advantageSide set to selected role | MATCH |
| 1.6.3 | Select Ambush, pick advantage side | advantageSide set to selected role | MATCH |

---

## 2. Initiative Phase

### 2.1 Card Drawing
**Rules**: Cards numbered 1–10, each side draws one. Lower card acts first.

| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 2.1.1 | Normal combat: both draw random unique cards | Two distinct cards 1–10, lower goes first | S5 | MATCH |
| 2.1.2 | Surprise: advantaged side gets card #1 | Advantaged always has card 1, opponent draws random 2–10 | S5 | MATCH |
| 2.1.3 | Ambush: advantaged side gets card #1 | Same as surprise for initiative purposes | S5 | MATCH |
| 2.1.4 | Winner text shows who goes first | "X GOES FIRST" for lower card holder | S5 | MATCH |
| 2.1.5 | Card draw animation plays | Cards flip with visual animation | — | MATCH |
| 2.1.6 | Continue button transitions to combat phase | Phase changes to 'combat', INIT_COMBAT dispatched | — | MATCH |

### 2.2 Turn Order
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 2.2.1 | Turn order set by initiative cards | Lower card holder in turnOrder[0] | S5 | MATCH |
| 2.2.2 | No re-draw between rounds | Turn order fixed for entire combat | S5 | SIMPLIFIED |

**Note**: Rules say redraw cards each round. Our implementation keeps the same turn order throughout combat. This is an intentional simplification for 1v1.

---

## 3. Action Economy

**Rules**: Each turn get 1 Full + 1 Quick OR 2 Quick. Model: `actionsRemaining: 2`, `fullActionUsed: boolean`.

### 3.1 Actions Per Turn
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 3.1.1 | Fresh turn shows 2 actions remaining | actionsRemaining = 2, fullActionUsed = false | S6 | MATCH |
| 3.1.2 | Quick action (move/cover) costs 1 action | actionsRemaining decrements by 1 | S6 | MATCH |
| 3.1.3 | Full action (attack) costs 1 action + sets fullActionUsed | actionsRemaining decrements, fullActionUsed = true | S6 | MATCH |
| 3.1.4 | After full action, second full action unavailable | Attack buttons disabled with "Full action already used" | S6 | MATCH |
| 3.1.5 | After full action, quick actions still available | Move/cover buttons remain active | S6 | MATCH |
| 3.1.6 | Two quick actions allowed (no full) | Can do move+cover or move+move | S6 | MATCH |
| 3.1.7 | Turn ends when actionsRemaining = 0 | Auto-advance to next turn | S6 | MATCH |
| 3.1.8 | PASS button ends turn immediately | All remaining actions forfeited, turn advances | — | MATCH |
| 3.1.9 | PASS available even with 2 actions remaining | Button always visible in action-select | — | MATCH |

### 3.2 Action Economy Edge Cases
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 3.2.1 | Quick action → full action = valid (1Q + 1F) | Both execute, turn ends | S6 | MATCH |
| 3.2.2 | Full action → quick action = valid (1F + 1Q) | Both execute, turn ends | S6 | MATCH |
| 3.2.3 | Full action → full action = blocked | Second full shows disabled | S6 | MATCH |

---

## 4. Movement

**Rules**: Quick action, move to adjacent zone (±1 index).

### 4.1 Basic Movement
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 4.1.1 | From zone 0, can move to zone 1 only | moveOptions = [1] | S14 | MATCH |
| 4.1.2 | From zone 1, can move to zone 0 or 2 | moveOptions = [0, 2] | S14 | MATCH |
| 4.1.3 | From zone 2, can move to zone 1 only | moveOptions = [1] | S14 | MATCH |
| 4.1.4 | Movement clears cover | Moving character's cover flag reset to false | S14 | MATCH |
| 4.1.5 | Zone map updates character position | Marker moves to selected zone | — | MATCH |
| 4.1.6 | Move zone selection via ActionSelect buttons | Zone selection sub-panel appears, zones listed | — | MATCH |
| 4.1.7 | Move zone selection via zone map click | Highlighted zones clickable, execute move | — | MATCH |
| 4.1.8 | Back button cancels zone selection | Returns to action list | — | MATCH |

### 4.2 Broken Character Movement
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 4.2.1 | Broken character (health = 0) can only move | Attack/cover actions not shown | S10 | MATCH |
| 4.2.2 | Broken character gets one move per turn | Move available, no other actions | S10 | SIMPLIFIED |

**Note**: Rules limit broken characters to ONE movement action per round total. Implementation allows the standard 2-action economy for movement since only move is available. Since move is a quick action, a broken character could theoretically move twice.

---

## 5. Close Combat

**Rules**: Full action. Roll STR + closeCombat + weapon mod. Opposed by defender's STR + closeCombat.

### 5.1 Attack Availability
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 5.1.1 | Close attack available when in same zone with close/unarmed weapon | Button shows enabled | S7 | MATCH |
| 5.1.2 | Close attack unavailable when not in same zone | Button not shown | S7 | MATCH |
| 5.1.3 | Close attack unavailable with ranged weapon | Button not shown | S7 | SIMPLIFIED |
| 5.1.4 | Close attack unavailable when fullActionUsed | Shows disabled with reason | S7 | MATCH |

**Note (5.1.3)**: Rules allow any weapon to be used in close combat (ranged at -2 dice). Our implementation restricts close attack to close/unarmed weapons only.

### 5.2 Dice Pool Composition
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 5.2.1 | Attack pool = STR + closeCombat skill + weapon mod | Sources breakdown shows each component | S7 | MATCH |
| 5.2.2 | Stress dice = current stress level | Separate amber dice added | S1 | MATCH |
| 5.2.3 | Minimum 1 base die | Even with 0 stats, roll at least 1 | S1 | MATCH |
| 5.2.4 | Defense pool = defender STR + closeCombat | Opposed roll calculated | S7 | MATCH |

### 5.3 Attack Resolution
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 5.3.1 | Net successes > 0 = hit | EffectSummary shows "hits" message | S7 | MATCH |
| 5.3.2 | Net successes = 0 = miss | EffectSummary shows "misses" message | S7 | MATCH |
| 5.3.3 | Damage = weapon.damage + (netSuccesses - 1) | Correct damage calculated | S7, S10 | MATCH |
| 5.3.4 | Armor absorbs damage (min 0 remaining) | Damage reduced by armor rating | S10 | MATCH |
| 5.3.5 | Target health reduced by net damage | Health bar updates | S10 | MATCH |

---

## 6. Ranged Combat

**Rules**: Full action. Roll AGI + rangedCombat + weapon mod. Opposed by defender's AGI + mobility.

### 6.1 Attack Availability
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 6.1.1 | Ranged attack available with ranged weapon + target in range | Button enabled | S8 | MATCH |
| 6.1.2 | Ranged attack unavailable when target out of range | Shows disabled, "Target out of range" | S8 | MATCH |
| 6.1.3 | Ranged attack unavailable with non-ranged weapon | Not shown | S8 | MATCH |
| 6.1.4 | Ranged attack unavailable when fullActionUsed | Shows disabled with reason | S8 | MATCH |

### 6.2 Range System
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 6.2.1 | Distance 0 (same zone) = Adjacent | Range check uses weapon.minRange | S8 | MATCH |
| 6.2.2 | Distance 1 = Short range | One zone apart | S8 | MATCH |
| 6.2.3 | Distance 2 = Medium range | Two zones apart (max in 3-zone map) | S8 | MATCH |
| 6.2.4 | Weapon min/max range enforced | Can't fire outside weapon's range bands | S8 | MATCH |

### 6.3 Dice Pool Composition
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 6.3.1 | Attack pool = AGI + rangedCombat + weapon mod | Sources breakdown correct | S8 | MATCH |
| 6.3.2 | Cover penalty applied (-1 die) | TARGET COVER source shows -1 | S8, S9 | **BUG** |
| 6.3.3 | Defense pool = AGI + mobility | Opposed roll with mobility skill | S8 | MATCH |

**BUG (6.3.2)**: Rules specify partial cover = -2 dice penalty to attacker. Implementation applies only -1 die. See `dicePoolCalculator.ts:51-53`.

---

## 7. Cover System

**Rules**: Partial cover = quick action, cluttered zone required. -2 dice to ranged attacks against you.

### 7.1 Taking Cover
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 7.1.1 | Partial cover available in cluttered zone | Button enabled | S9 | MATCH |
| 7.1.2 | Partial cover unavailable in non-cluttered zone | Not shown | S9 | MATCH |
| 7.1.3 | Can't take cover if already in cover | Shows disabled, "Already in cover" | S9 | MATCH |
| 7.1.4 | Cover is a quick action | Costs 1 action, doesn't set fullActionUsed | S9 | MATCH |
| 7.1.5 | Cover indicator shows on StatusBar | `[COVER]` tag visible | — | MATCH |

### 7.2 Cover Clearing
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 7.2.1 | Moving clears cover | Cover flag reset on MOVE_CHARACTER | S9 | MATCH |
| 7.2.2 | Cover clears at start of your turn | ADVANCE_TURN resets incoming actor's cover | — | MATCH |

### 7.3 Cover Combat Effects
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 7.3.1 | Ranged attack vs covered target gets dice penalty | Cover penalty in attack pool | S9 | **BUG** |
| 7.3.2 | Close combat attack not affected by cover | No cover modifier for close attacks | S9 | MATCH |

**BUG (7.3.1)**: Cover penalty is -1 die in implementation but should be -2 dice per rules.

---

## 8. Armor & Damage

**Rules**: Damage = weapon base + extra successes. Armor reduces damage. Armor piercing = armor -1 step.

### 8.1 Damage Calculation
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 8.1.1 | Hit with 1 net success: damage = weapon.damage | Base damage only | S10 | MATCH |
| 8.1.2 | Hit with 3 net successes: damage = weapon.damage + 2 | Extra successes add to damage | S10 | MATCH |
| 8.1.3 | Armor reduces damage | netDamage = rawDamage - armor.rating | S10 | MATCH |
| 8.1.4 | Armor can't reduce damage below 0 | armorAbsorbed capped at rawDamage | S10 | MATCH |

### 8.2 Armor Piercing
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 8.2.1 | AP weapon reduces armor by 1 step | effectiveArmor = armor.rating - 1, min 0 | S12, S13 | MATCH |
| 8.2.2 | AP against armor 0 = still 0 | No negative armor | S12 | MATCH |
| 8.2.3 | Non-AP weapon uses full armor | Full armor.rating applied | S12 | MATCH |

### 8.3 Health Tracking
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 8.3.1 | Health decrements by netDamage | StatusBar updates | S10 | MATCH |
| 8.3.2 | Health can't go below 0 | Clamped at 0 | S10 | MATCH |
| 8.3.3 | Health can't exceed maxHealth | Clamped at maxHealth | S10 | MATCH |
| 8.3.4 | Health = 0 → character is Broken | isBroken flag set, combat end triggered | S10 | MATCH |

---

## 9. Dice Rolling & Push Mechanics

**Rules**: Roll d6 pool, 6 = success. Push: +1 stress, +1 stress die, re-roll all non-6s. Can push once. Cannot push if stress die showed 1.

### 9.1 Basic Rolling
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 9.1.1 | Each die shows 1–6 | Valid d6 results | S1 | MATCH |
| 9.1.2 | Die showing 6 = success (highlighted) | Visual success indicator | S1 | MATCH |
| 9.1.3 | Base dice shown in green (normal variant) | Green dice for base pool | — | MATCH |
| 9.1.4 | Stress dice shown in amber (stress variant) | Amber dice for stress pool | — | MATCH |
| 9.1.5 | Dice pool animated on display | Rolling animation plays | — | MATCH |
| 9.1.6 | Success count displayed | Total successes from base+stress | S1 | MATCH |

### 9.2 Push Mechanics
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 9.2.1 | Push button available on first roll | "PUSH YOUR LUCK" visible | S1 | MATCH |
| 9.2.2 | Push adds +1 stress | Stress level incremented | S1 | MATCH |
| 9.2.3 | Push adds 1 extra stress die | Stress dice count + 1 | S1 | MATCH |
| 9.2.4 | Push re-rolls all non-6 base dice | Successes (6s) preserved, others re-rolled | S1 | MATCH |
| 9.2.5 | Can push only once | After push, button disabled "Already pushed" | S1 | MATCH |
| 9.2.6 | Push blocked if stress die showed 1 | Button disabled with reason | S1 | **BUG** |
| 9.2.7 | Push available even if initial roll succeeded | Can push for more successes | S1 | MATCH |
| 9.2.8 | Only attacker (player) can push | Enemy AI auto-continues, no push | S1 | MATCH |

**BUG (9.2.6)**: Rules state you CANNOT push if any stress die showed 1 in the initial roll. The implementation always allows push (sets `pushState: { allowed: true }`) regardless of stress die results. See `useCombatTurn.ts:165`.

### 9.3 DiceRollResult Display
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 9.3.1 | Title shows attack type | "CLOSE COMBAT ATTACK" or "RANGED ATTACK" | — | MATCH |
| 9.3.2 | Sources breakdown listed | Each pool component with count | — | MATCH |
| 9.3.3 | Success text shows context | "Strong attack — now the defender rolls..." | — | MATCH |
| 9.3.4 | Failure text shows context | "No successes — defender may escape unharmed." | — | MATCH |
| 9.3.5 | Continue button advances to effect phase | Resolves attack, shows EffectSummary | — | MATCH |

---

## 10. Stress & Panic

**Rules**: Stress dice showing 1 = stress response. Stress response table based on d6 + stress - resolve. Full panic table for specific triggers.

### 10.1 Stress Tracking
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 10.1.1 | Stress starts at 0 | Initial combatState stress = 0 | S11 | MATCH |
| 10.1.2 | Push increases stress by 1 | Stress level increments | S11 | MATCH |
| 10.1.3 | Panic detected increases stress by 1 | When stress die = 1, +1 stress | S11 | SIMPLIFIED |
| 10.1.4 | Stress capped at 10 | Can't exceed 10 | S11 | SIMPLIFIED |
| 10.1.5 | Stress ignored when broken (health = 0) | UPDATE_STRESS no-ops for broken chars | S11 | MATCH |
| 10.1.6 | Stress displayed on StatusBar | Stress level visible | — | MATCH |

### 10.2 Panic Detection
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 10.2.1 | Any stress die = 1 triggers panic | checkPanic returns true | S11 | MATCH |
| 10.2.2 | Panic checked for both attacker and defender | Both sets of stress dice checked after attack resolves | S11 | MATCH |
| 10.2.3 | Panic notification shown in EffectSummary | "X PANICS!" line appears | S11 | MATCH |
| 10.2.4 | Panic increases stress by +1 | Stress incremented | S11 | SIMPLIFIED |

### 10.3 Simplifications vs Rules
| # | Simplification | Rules | Impact |
|---|----------------|-------|--------|
| 10.3.1 | Panic = +1 stress only | Full stress response table (d6 + stress - resolve, 7 outcomes) | No dice penalties, no behavioral effects |
| 10.3.2 | No Resolve stat | Resolve = (Wits + Empathy) / 2, subtracted from panic roll | Panic always triggers at same threshold |
| 10.3.3 | No stress response table | 7-entry table with escalating effects | Simplified to notification only |
| 10.3.4 | No full panic table | 12-entry table with dramatic effects (flee, frenzy, catatonic) | No behavioral disruption from panic |
| 10.3.5 | Stress cap at 10 | Rules say no maximum | Minor — 10 is practical limit |

All marked **SIMPLIFIED** — acceptable for v1 combat simulator.

---

## 11. Talents

### 11.1 Talent Storage
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 11.1.1 | Talents stored on Character | talents: Record<string, number> | S4 | MATCH |
| 11.1.2 | Career filtering works on picker | Only relevant talents shown | S4 | MATCH |

### 11.2 Talent Combat Effects
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 11.2.1 | Talents NOT applied to dice pools | No talent modifiers in calculateAttackPool/DefensePool | S4 | **SIMPLIFIED** |
| 11.2.2 | weaponSpecialist: should add +2 dice | Not implemented in combat | S4 | SIMPLIFIED |
| 11.2.3 | haymaker: should add +2 to close combat | Not implemented in combat | S4 | SIMPLIFIED |
| 11.2.4 | seenItAll: should increase Resolve | Resolve not implemented | S4 | SIMPLIFIED |

**Note**: Talents are stored but not used in combat calculations. This is a known v1 simplification. The talent picker UI works correctly; combat integration is deferred.

---

## 12. AI Enemy Behavior

### 12.1 Decision Tree
| # | Test | Expected | Status |
|---|------|----------|--------|
| 12.1.1 | Broken enemy retreats from player | Moves to zone farther from player | MATCH |
| 12.1.2 | Same zone + close weapon → close attack | Prioritizes melee attack | MATCH |
| 12.1.3 | Ranged weapon + target in range → ranged attack | Fires when able | MATCH |
| 12.1.4 | Ranged weapon + out of range → move toward | Closes distance to get in range | MATCH |
| 12.1.5 | Close weapon + different zone → move toward | Closes distance for melee | MATCH |
| 12.1.6 | Cluttered zone + no cover + only quick left → take cover | Uses remaining action for cover | MATCH |
| 12.1.7 | Fallback → move toward player | Advances if nothing else to do | MATCH |

### 12.2 AI Turn Execution
| # | Test | Expected | Status |
|---|------|----------|--------|
| 12.2.1 | Turn announce auto-continues after ~1.2s | Timer-based transition | MATCH |
| 12.2.2 | Action select auto-decides after ~0.8s | AI chooses action with delay | MATCH |
| 12.2.3 | Dice roll auto-continues after ~2s | Auto-advance past dice display | MATCH |
| 12.2.4 | Effect auto-continues after ~1.5s | Auto-advance past effect summary | MATCH |
| 12.2.5 | AI never pushes dice rolls | Push state null for enemy turns | MATCH |
| 12.2.6 | AI reasoning logged to combat log | AI decision reasoning visible | MATCH |
| 12.2.7 | "ENEMY IS DECIDING..." shown during AI action-select | Visual indicator for player | MATCH |

### 12.3 AI Edge Cases
| # | Test | Expected | Status |
|---|------|----------|--------|
| 12.3.1 | AI with no available actions | Falls back gracefully | MATCH |
| 12.3.2 | AI uses legal actions only | Never attempts unavailable action | MATCH |
| 12.3.3 | AI move always provides moveToZone | No zone-selection UI triggered for AI | MATCH |

---

## 13. Zone Map Display

### 13.1 Visual Elements
| # | Test | Expected | Status |
|---|------|----------|--------|
| 13.1.1 | 3 zones displayed horizontally | ZoneCells connected by dashed lines | MATCH |
| 13.1.2 | Zone names shown | From zone map preset definition | MATCH |
| 13.1.3 | Cluttered indicator shown | Zones with cluttered=true marked | MATCH |
| 13.1.4 | Player marker (green circle) at correct zone | Position matches playerZoneIndex | MATCH |
| 13.1.5 | Enemy marker (red circle) at correct zone | Position matches enemyZoneIndex | MATCH |
| 13.1.6 | Both markers visible when in same zone | Offset to avoid overlap | MATCH |

### 13.2 Interactive Zone Map
| # | Test | Expected | Status |
|---|------|----------|--------|
| 13.2.1 | During move selection, valid zones highlighted | Pulsing/highlighted border | MATCH |
| 13.2.2 | Clicking highlighted zone executes move | Character moves to clicked zone | MATCH |
| 13.2.3 | Clicking non-highlighted zone does nothing | No action | MATCH |
| 13.2.4 | Zone highlights clear after move | No residual highlights | MATCH |

---

## 14. Combat HUD

### 14.1 StatusBar
| # | Test | Expected | Status |
|---|------|----------|--------|
| 14.1.1 | Player StatusBar shows name, HP, stress | All values visible and correct | MATCH |
| 14.1.2 | Enemy StatusBar shows name, HP, stress | All values visible and correct | MATCH |
| 14.1.3 | Cover indicator `[COVER]` shown when in cover | Visual tag appears/disappears | MATCH |
| 14.1.4 | Broken indicator shown when health = 0 | `[BROKEN]` tag or visual change | MATCH |
| 14.1.5 | HP updates in real-time after damage | StatusBar reflects new health | MATCH |

### 14.2 Round Counter
| # | Test | Expected | Status |
|---|------|----------|--------|
| 14.2.1 | Round number displayed | "ROUND N" header | MATCH |
| 14.2.2 | Round increments when both sides have acted | After last in turnOrder acts, round + 1 | MATCH |

---

## 15. Turn Flow & Sub-Phases

### 15.1 Sub-Phase State Machine
| # | Test | Expected | Status |
|---|------|----------|--------|
| 15.1.1 | turn-announce → (continue) → action-select | Player sees TurnAnnounce, clicks to proceed | MATCH |
| 15.1.2 | action-select → (move/cover) → effect | Quick actions skip dice-roll | MATCH |
| 15.1.3 | action-select → (attack) → dice-roll → effect | Full actions show dice roll first | MATCH |
| 15.1.4 | effect → (actions remaining) → action-select | Loop back for second action | MATCH |
| 15.1.5 | effect → (no actions) → turn-announce (next) | Advance to next character's turn | MATCH |
| 15.1.6 | effect → (someone broken) → result phase | Combat ends | MATCH |
| 15.1.7 | action-select → (pass) → turn-announce (next) | Skip remaining actions | MATCH |

### 15.2 Turn Transitions
| # | Test | Expected | Status |
|---|------|----------|--------|
| 15.2.1 | ADVANCE_TURN resets actionsRemaining to 2 | Fresh action budget | MATCH |
| 15.2.2 | ADVANCE_TURN resets fullActionUsed to false | Full action available again | MATCH |
| 15.2.3 | ADVANCE_TURN clears incoming actor's cover | New turn clears your own cover | MATCH |
| 15.2.4 | Round increments when turnOrder wraps | Both sides acted = new round | MATCH |

---

## 16. Combat End & Result

### 16.1 Combat End Detection
| # | Test | Expected | Rules Ref | Status |
|---|------|----------|-----------|--------|
| 16.1.1 | Enemy health reaches 0 → player wins | Winner set, combat ends | S10 | MATCH |
| 16.1.2 | Player health reaches 0 → enemy wins | Winner set, combat ends | S10 | MATCH |
| 16.1.3 | Combat ends after effect phase resolves | END_COMBAT dispatched on next onEffectContinue | S10 | MATCH |

### 16.2 Result View
| # | Test | Expected | Status |
|---|------|----------|--------|
| 16.2.1 | VICTORY screen on player win | Large victory text, green theme | MATCH |
| 16.2.2 | DEFEAT screen on enemy win | Large defeat text, red theme | MATCH |
| 16.2.3 | Final stats displayed (health, stress, round) | Summary information shown | MATCH |
| 16.2.4 | PLAY AGAIN button visible | Button to restart | MATCH |
| 16.2.5 | PLAY AGAIN resets to character-select | Phase resets, health restored | MATCH |

---

## 17. Full Game Loop E2E Scenarios

### 17.1 Happy Path: Player Wins with Close Combat
```
1. Select Marine preset
2. Keep default stats (STR 5, AGI 3)
3. Set closeCombat skill to 3
4. Set weapon to close (mod +1, dmg 2)
5. Set armor to 1
6. Normal combat → draw initiative
7. Continue to combat
8. Move toward enemy (zone 0 → 1)
9. Move again (zone 1 → 2, same as enemy)
10. Next turn: close attack
11. View dice roll, optionally push
12. Continue to effect → damage applied
13. Use second action (cover or attack if available)
14. Repeat until enemy health = 0
15. VICTORY screen
16. Play Again → back to character select
```

### 17.2 Happy Path: Player Wins with Ranged Combat
```
1. Select Marshal preset
2. Set rangedCombat skill to 3
3. Set weapon to ranged (mod +2, dmg 2, range short/medium)
4. Normal combat → initiative
5. Stay at range, fire ranged attack
6. View dice, optionally push
7. Effect → damage
8. Use second action (cover in cluttered zone)
9. Enemy turn: AI moves toward or attacks
10. Repeat until enemy broken
11. VICTORY
```

### 17.3 Stress Scenario
```
1. Select Kid preset (low STR)
2. Set up combat, get into fights
3. Push dice rolls → stress increases
4. Observe stress dice in pools
5. Watch for panic triggers (stress die = 1)
6. Verify panic notification and +1 stress
7. Verify stress shown on StatusBar
```

### 17.4 Armor Piercing Scenario
```
1. Set player weapon with armorPiercing = true
2. Set enemy armor to 2
3. Attack and hit
4. Verify effective armor = 1 (2 - 1 AP)
5. Verify damage reduced by 1, not 2
```

### 17.5 Cover Scenario
```
1. Move to cluttered zone
2. Take partial cover (quick action)
3. Verify cover indicator on StatusBar
4. Enemy ranged attack: verify cover penalty in dice pool
5. Move away: verify cover clears
6. Next turn: verify cover resets at turn start
```

### 17.6 Pass Turn Scenario
```
1. Player's turn starts with 2 actions
2. Click PASS immediately
3. Verify turn advances to enemy
4. Enemy acts, then player turn again
5. Take one action (move)
6. Click PASS for remaining action
7. Verify turn advances
```

---

## 18. Known Bugs to Fix

| # | Bug | Location | Rules Ref | Severity |
|---|-----|----------|-----------|----------|
| B1 | Cover penalty is -1 die, should be -2 | `dicePoolCalculator.ts:51-53` | S9: "Partial cover: -2 dice" | Medium |
| B2 | Push allowed even when stress die showed 1 | `useCombatTurn.ts:165` | S1: "CANNOT push if any stress dice showed 1" | Medium |

---

## 19. Known Simplifications (Accepted for v1)

| # | Feature | Rules | Implementation | Rationale |
|---|---------|-------|----------------|-----------|
| S1 | Initiative redraw | Redraw cards each round | Fixed turn order | 1v1 makes redraw unnecessary |
| S2 | Broken movement limit | Only 1 move action per round | Normal 2-action economy (only move available) | Minor — functionally similar |
| S3 | Ranged in close combat | Any weapon at -2 dice | Only close/unarmed weapons for close attack | Avoids weapon-type switching complexity |
| S4 | Stress response table | 7 outcomes based on d6 + stress - resolve | Just +1 stress notification | Full table too complex for v1 |
| S5 | Panic table | 12 dramatic outcomes | Just +1 stress notification | Full table too complex for v1 |
| S6 | Resolve stat | (Wits + Empathy) / 2 | Not implemented | No wits/empathy attributes in combat |
| S7 | Talent combat effects | Various +2 dice bonuses, double push, etc. | Talents stored but not applied | Deferred to v2 |
| S8 | Critical injuries | d66 table with 36 outcomes | Health 0 = broken = combat end | Combat sim focuses on the fight, not aftermath |
| S9 | Ammunition tracking | Supply rolls, reload as quick action | Unlimited ammo | Adds complexity without much gameplay |
| S10 | Full auto / burst fire | Multiple attacks per action | Not implemented | Requires ammo system first |
| S11 | Dodge as interrupt | Defender can dodge ranged as quick action (interrupt) | Auto-defense via opposed roll | Simplifies combat flow |
| S12 | Below-min-range penalty | -2 dice per band below weapon min range | Can't attack at all outside range | Binary range check instead of penalty |
| S13 | Stress cap | No maximum per rules | Capped at 10 | Practical limit |

---

## 20. Component Storybook Verification

Verify each combat component renders correctly in Storybook in isolation:

| # | Component | Story Variants | Status |
|---|-----------|---------------|--------|
| 20.1 | ZoneCell | Default, cluttered, player, enemy, both, highlighted | Verify |
| 20.2 | StatusBar | Player, enemy, with cover, broken | Verify |
| 20.3 | ActionButton | Quick, full, disabled | Verify |
| 20.4 | ZoneMap | Default positions, same zone, highlighted | Verify |
| 20.5 | CombatHud | Full state, cover, broken | Verify |
| 20.6 | ActionSelect | Full turn, quick only, no attack | Verify |
| 20.7 | TurnAnnounce | Player turn, enemy turn | Verify |
| 20.8 | EffectSummary | Damage, move, cover, panic, multi-line | Verify |
| 20.9 | DiceRollResult | Success, failure, push available, pushed | Verify |
| 20.10 | InitiativeResult | Player wins, enemy wins | Verify |

---

## 21. Responsive Design

| # | Test | Breakpoints |
|---|------|------------|
| 21.1 | All combat views fit mobile viewport (375px) | Default |
| 21.2 | Zone map readable on small screens | 375px |
| 21.3 | Action buttons tappable (min 44px touch target) | 375px, 480px |
| 21.4 | Dice pool layout adjusts for wider screens | 480px, 768px |
| 21.5 | CombatHud doesn't overflow | All breakpoints |
| 21.6 | StatusBar text readable | 375px |
