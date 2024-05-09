-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "workspaceCode" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_workspaceCode_key" ON "workspaces"("workspaceCode");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_inviteCode_key" ON "workspaces"("inviteCode");
