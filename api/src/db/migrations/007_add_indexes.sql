-- Migration: Add missing indexes for performance
-- Date: 2026-03-07

-- Index on memories.memory_date for date range queries
CREATE INDEX IF NOT EXISTS idx_memories_memory_date ON memories(memory_date);

-- Index on emotional_cycles.start_date for cycle calculations
CREATE INDEX IF NOT EXISTS idx_emotional_cycles_start_date ON emotional_cycles(start_date);
